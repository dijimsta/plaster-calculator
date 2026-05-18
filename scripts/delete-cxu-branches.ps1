# Usage:
# scripts\delete-cxu-branches.cmd
# scripts\delete-cxu-branches.cmd -WhatIf
# scripts\delete-cxu-branches.cmd -Force

[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [switch] $Force
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Split-Path -Parent $ScriptDir

function Invoke-Git {
    param([Parameter(ValueFromRemainingArguments = $true)][string[]] $Arguments)

    & git @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "git $($Arguments -join ' ') failed."
    }
}

Push-Location $RepoRoot
try {
    Invoke-Git rev-parse --is-inside-work-tree | Out-Null

    $currentBranch = (Invoke-Git branch --show-current).Trim()
    $branches = @(Invoke-Git for-each-ref --format="%(refname:short)" refs/heads/cxu-* |
        ForEach-Object { $_.Trim() } |
        Where-Object { $_ -and $_ -ne $currentBranch })

    if ($branches.Count -eq 0) {
        if ($currentBranch -like "cxu-*") {
            Write-Host "No cxu-* branches to delete. The current branch '$currentBranch' was skipped."
        }
        else {
            Write-Host "No local cxu-* branches found."
        }
        return
    }

    $deleteFlag = if ($Force) { "-D" } else { "-d" }

    foreach ($branch in $branches) {
        if ($PSCmdlet.ShouldProcess($branch, "Delete local git branch")) {
            Invoke-Git branch $deleteFlag $branch
        }
    }

    if ($currentBranch -like "cxu-*") {
        Write-Host "Skipped current branch '$currentBranch'. Check out another branch first if you want to delete it."
    }
}
finally {
    Pop-Location
}
