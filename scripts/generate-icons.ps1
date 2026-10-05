# Native Windows Icon Generator for Android & PWA
Add-Type -AssemblyName System.Drawing

$candidates = @(
    "assets/icon.png",
    "assets/raw_icon.jpg",
    "assets/icon.jpg",
    "icon.png",
    "icon.jpg",
    "assets/logo.png",
    "assets/logo.jpg"
)

$sourceIcon = $null
foreach ($path in $candidates) {
    if (Test-Path $path -PathType Leaf) {
        $sourceIcon = (Resolve-Path $path).Path
        break
    }
}

if (-not $sourceIcon) {
    Write-Host "[Error] Could not find an icon file in assets/ or root." -ForegroundColor Red
    exit 1
}

Write-Host "Found source icon: $sourceIcon" -ForegroundColor Green

$rawImg = [System.Drawing.Image]::FromFile($sourceIcon)

# Ensure the source image is rendered onto a square master bitmap to preserve aspect ratio
$maxDim = [Math]::Max($rawImg.Width, $rawImg.Height)
$squareBitmap = New-Object System.Drawing.Bitmap($maxDim, $maxDim)
$gSquare = [System.Drawing.Graphics]::FromImage($squareBitmap)
$gSquare.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
$gSquare.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$gSquare.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gSquare.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gSquare.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gSquare.Clear([System.Drawing.Color]::Transparent)

# Center image inside square
$offsetX = [int](($maxDim - $rawImg.Width) / 2)
$offsetY = [int](($maxDim - $rawImg.Height) / 2)
$gSquare.DrawImage($rawImg, $offsetX, $offsetY, $rawImg.Width, $rawImg.Height)
$gSquare.Dispose()
$rawImg.Dispose()

# Save as normalized assets/icon.png
$squareBitmap.Save("assets/icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

function Resize-And-Save($src, $targetPath, $width, $height) {
    $dir = Split-Path $targetPath -Parent
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    
    $destBitmap = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($destBitmap)
    $g.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($src, 0, 0, $width, $height)
    $g.Dispose()
    
    $destBitmap.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destBitmap.Dispose()
    Write-Host "Generated: $targetPath ($($width)x$($height))" -ForegroundColor Cyan
}

# Android standard launcher icons
$densities = @{
    "mipmap-mdpi" = 48
    "mipmap-hdpi" = 72
    "mipmap-xhdpi" = 96
    "mipmap-xxhdpi" = 144
    "mipmap-xxxhdpi" = 192
}

# Android adaptive foreground icons
$adaptiveDensities = @{
    "mipmap-mdpi" = 108
    "mipmap-hdpi" = 162
    "mipmap-xhdpi" = 216
    "mipmap-xxhdpi" = 324
    "mipmap-xxxhdpi" = 432
}

$resDir = "android/app/src/main/res"

foreach ($d in $densities.Keys) {
    $size = $densities[$d]
    Resize-And-Save $squareBitmap "$resDir/$d/ic_launcher.png" $size $size
    Resize-And-Save $squareBitmap "$resDir/$d/ic_launcher_round.png" $size $size
}

foreach ($d in $adaptiveDensities.Keys) {
    $size = $adaptiveDensities[$d]
    Resize-And-Save $squareBitmap "$resDir/$d/ic_launcher_foreground.png" $size $size
}

# Also generate PWA icons
Resize-And-Save $squareBitmap "public/icon-192.png" 192 192
Resize-And-Save $squareBitmap "public/icon-512.png" 512 512

$squareBitmap.Dispose()

Write-Host "`nAll Android and PWA launcher icons generated successfully!" -ForegroundColor Green
