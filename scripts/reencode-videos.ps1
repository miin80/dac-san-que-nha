<#
.SYNOPSIS
    Re-encode toàn bộ video MP4 trong public/videos/ sang format iOS-safe.

.DESCRIPTION
    iOS Safari (đặc biệt iPhone) khắt khe với codec — chỉ phát mượt
    H.264 Baseline Profile + yuv420p + faststart. Script này dùng FFmpeg
    để re-encode tất cả video về format này.

    - Codec video: H.264 Baseline Profile 3.0
    - Codec audio: AAC 128kbps
    - Pixel format: yuv420p (universal)
    - Faststart: metadata ở đầu file → stream-play được ngay
    - Max width 720px (giảm size cho mobile, phù hợp Reels 9:16)

.NOTES
    Backup file gốc sang videos-original/ trước khi re-encode.
    Backup folder KHÔNG push lên Git (đã thêm vào .gitignore).

    Yêu cầu: FFmpeg đã cài (winget install Gyan.FFmpeg)
#>

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$videosDir = Join-Path $root "public\videos"
$backupDir = Join-Path $root "videos-original"

# Đảm bảo FFmpeg trong PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "FFmpeg chưa cài. Chạy: winget install Gyan.FFmpeg" -ForegroundColor Red
    exit 1
}

# Tạo backup folder nếu chưa có
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}

# Lấy danh sách tất cả MP4
$videos = Get-ChildItem -Path $videosDir -Recurse -File -Filter *.mp4
$total = $videos.Count

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Re-encoding $total video về H.264 Baseline (iOS-safe)" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

$totalBefore = 0
$totalAfter = 0
$successCount = 0
$failCount = 0

$i = 0
foreach ($v in $videos) {
    $i++

    # Relative path để in cho gọn (e.g. "keo-lac\keo-lac-1.mp4")
    $relPath = $v.FullName.Substring($videosDir.Length + 1)
    $sizeMB = [math]::Round($v.Length / 1MB, 2)
    $totalBefore += $v.Length

    Write-Host ("[$i/$total] " + $relPath + " ($sizeMB MB)") -ForegroundColor Yellow -NoNewline

    # Backup nếu chưa có
    $backupPath = Join-Path $backupDir $relPath
    $backupParent = Split-Path -Parent $backupPath
    if (-not (Test-Path $backupParent)) {
        New-Item -ItemType Directory -Path $backupParent -Force | Out-Null
    }
    if (-not (Test-Path $backupPath)) {
        Copy-Item $v.FullName $backupPath
    }

    # Output tạm sang file .tmp.mp4
    $tmpOut = $v.FullName + ".tmp.mp4"

    # FFmpeg command — iOS-safe encode
    $ffArgs = @(
        "-y",                              # overwrite output
        "-i", $v.FullName,
        "-c:v", "libx264",                 # H.264 codec
        "-profile:v", "baseline",          # Baseline profile (iOS-safe nhất)
        "-level", "3.0",
        "-pix_fmt", "yuv420p",             # Universal pixel format
        "-vf", "scale=720:-2",             # Max width 720px, giữ aspect ratio (chia hết cho 2)
        "-preset", "medium",               # Cân bằng tốc độ vs chất lượng
        "-crf", "26",                      # Quality (18=cao, 28=thấp). 26 = đẹp + nhỏ
        "-c:a", "aac",                     # AAC audio
        "-b:a", "128k",                    # 128kbps audio
        "-movflags", "+faststart",         # Metadata ở đầu file
        "-loglevel", "error",              # Bớt log
        $tmpOut
    )

    try {
        & ffmpeg @ffArgs 2>$null

        if ($LASTEXITCODE -eq 0 -and (Test-Path $tmpOut)) {
            # Thay file gốc bằng file mới
            $newSize = (Get-Item $tmpOut).Length
            $totalAfter += $newSize
            $newSizeMB = [math]::Round($newSize / 1MB, 2)
            $saved = [math]::Round(($v.Length - $newSize) / 1MB, 2)

            Remove-Item $v.FullName -Force
            Move-Item $tmpOut $v.FullName

            Write-Host " → $newSizeMB MB ✓ tiết kiệm $saved MB" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host " ✗ FFmpeg fail" -ForegroundColor Red
            if (Test-Path $tmpOut) { Remove-Item $tmpOut -Force }
            $failCount++
        }
    } catch {
        Write-Host " ✗ Error: $_" -ForegroundColor Red
        if (Test-Path $tmpOut) { Remove-Item $tmpOut -Force }
        $failCount++
    }
}

# Summary
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  KẾT QUẢ" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ("  ✓ Thành công:  $successCount / $total") -ForegroundColor Green
if ($failCount -gt 0) {
    Write-Host ("  ✗ Thất bại:    $failCount") -ForegroundColor Red
}
Write-Host ("  Trước:         {0} MB" -f [math]::Round($totalBefore / 1MB, 1))
Write-Host ("  Sau:           {0} MB" -f [math]::Round($totalAfter / 1MB, 1))
$savedTotal = [math]::Round(($totalBefore - $totalAfter) / 1MB, 1)
$percent = [math]::Round(($totalBefore - $totalAfter) / $totalBefore * 100, 0)
Write-Host ("  Tiết kiệm:     $savedTotal MB ($percent%)") -ForegroundColor Yellow
Write-Host ""
Write-Host "  Backup ở: $backupDir" -ForegroundColor Gray
Write-Host "  (Folder này KHÔNG push lên Git — đã thêm .gitignore)" -ForegroundColor Gray
Write-Host ""
