# Scan .html and .md files and add rel="sponsored noopener" to links pointing to adblogin.com
Get-ChildItem -Path . -Include *.html,*.md -Recurse | ForEach-Object {
    $path = $_.FullName
    $content = Get-Content $path -Raw
    $updated = $false
    # find anchors with adblogin in href
    $pattern = '<a[^>]*href=["\''][^"\'']*adblogin\.com[^"\'']*["\''][^>]*>'
    [regex]::Matches($content, $pattern) | ForEach-Object {
        $anchor = $_.Value
        if ($anchor -notmatch 'rel=') {
            $newAnchor = $anchor -replace '>$', ' rel="sponsored noopener">'
            $content = $content.Replace($anchor, $newAnchor)
            $updated = $true
        } elseif ($anchor -notmatch 'sponsored') {
            # append sponsored if rel exists but not sponsored
            $newAnchor = $anchor -replace 'rel=["\'']([^"\'']*)["\'']', 'rel="$1 sponsored"'
            $content = $content.Replace($anchor, $newAnchor)
            $updated = $true
        }
    }
    if ($updated) {
        Set-Content -Path $path -Value $content -Force
        Write-Output "Updated affiliate links in: $path"
    }
}
