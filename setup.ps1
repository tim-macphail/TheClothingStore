# setup.ps1

Write-Host "Setting up The Clothing Store project..." -ForegroundColor Green

# Function to test PostgreSQL connection
function Test-PostgresConnection {
    param (
        [string]$Database = "postgres"
    )
    try {
        # Check if psql exists in Program Files
        $psqlPaths = @(
            "${env:ProgramFiles}\PostgreSQL\*\bin\psql.exe",
            "${env:ProgramFiles(x86)}\PostgreSQL\*\bin\psql.exe"
        )
        
        $psqlExe = Get-ChildItem -Path $psqlPaths -ErrorAction SilentlyContinue | Select-Object -First 1
        
        if ($psqlExe) {
            Write-Host "PostgreSQL installation found at: $($psqlExe.Directory)" -ForegroundColor Green
            return $true
        }
        
        # Additional check for running PostgreSQL service
        $service = Get-Service postgresql* -ErrorAction SilentlyContinue
        if ($service -and $service.Status -eq 'Running') {
            Write-Host "PostgreSQL service is running" -ForegroundColor Green
            return $true
        }
        
        return $false
    }
    catch {
        return $false
    }
}

# Check PostgreSQL
if (-not (Test-PostgresConnection)) {
    Write-Host @"
PostgreSQL not detected or not running. Please ensure:
1. PostgreSQL is installed (https://www.postgresql.org/download/)
2. PostgreSQL service is running
3. A database named 'clothingstore' exists
"@ -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne 'y') {
        exit
    }
}

# Check if Node.js is installed
$nodePath = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodePath) {
    Write-Host "Node.js is not installed. Please install it from https://nodejs.org/" -ForegroundColor Red
    exit
}

# Check if yarn is installed
$yarnPath = Get-Command yarn -ErrorAction SilentlyContinue
if (-not $yarnPath) {
    Write-Host "Installing yarn..." -ForegroundColor Yellow
    npm install -g yarn
}

# Create backend .env if it doesn't exist
if (-not (Test-Path backend/.env)) {
    Write-Host "Creating backend/.env file..." -ForegroundColor Yellow
    @"
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password_here
DB_DATABASE=clothingstore
"@ | Out-File -FilePath backend/.env -Encoding UTF8
    Write-Host "Please update backend/.env with your database credentials" -ForegroundColor Yellow
}

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
yarn install

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location ../frontend
yarn install

# Back to root
Set-Location ..

Write-Host @"

Setup complete! Next steps:

1. Verify backend/.env has correct database credentials
2. Start the backend: 
   cd backend
   yarn dev

3. In a new terminal, start the frontend:
   cd frontend
   yarn dev

4. Import initial data:
   cd backend
   yarn import-data

Access the application at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

"@ -ForegroundColor Green

# Prompt to open .env file
$openEnv = Read-Host "Would you like to edit the .env file now? (y/n)"
if ($openEnv -eq 'y') {
    if (Test-Path "backend/.env") {
        Start-Process notepad "backend/.env"
    }
}

# Prompt to start services
$startServices = Read-Host "Would you like to start the services now? (y/n)"
if ($startServices -eq 'y') {
    Start-Process powershell -ArgumentList "-NoExit -Command cd '$PWD\backend' ; yarn dev"
    Start-Process powershell -ArgumentList "-NoExit -Command cd '$PWD\frontend' ; yarn dev"
}