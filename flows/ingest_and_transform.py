from prefect import flow, task
import subprocess
from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parent.parent

@task
def run_ingestion():
    script_path = PROJECT_ROOT / "ingestion" / "ingest_top_coins.py"
    subprocess.run([sys.executable, str(script_path)], check=True)

@task
def run_dbt():
    dbt_dir = PROJECT_ROOT / "crypto_dbt"
    subprocess.run(["dbt", "run"], cwd=str(dbt_dir), check=True)
    subprocess.run(["dbt", "test"], cwd=str(dbt_dir), check=True)
    subprocess.run(["dbt", "snapshot"], cwd=str(dbt_dir), check=True)

@flow
def crypto_pipeline():
    run_ingestion()
    run_dbt()

if __name__ == "__main__":
    crypto_pipeline()
