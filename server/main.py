from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_name(db, name=user.name)
    if db_user:
        raise HTTPException(status_code=400, detail="An account belonging to this user is already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/users/{user_id}/samples/", response_model=schemas.Sample)
def create_sample_for_user(
    user_id: int, sample: schemas.SampleCreate, db: Session = Depends(get_db)
):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    existing_sample = crud.get_sample_by_label(db, sample_label=sample.sample_label)
    if existing_sample:
        raise HTTPException(status_code=400, detail="A sample with this label is already registered")
    if sample.inner_diameter >= sample.outer_diameter:
        raise HTTPException(status_code=400, detail="Inner diameter must be lesser than outer diameter")
    return crud.create_user_sample(db=db, sample=sample, user_id=user_id)

@app.get("/samples/", response_model=list[schemas.Sample])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    samples = crud.get_samples(db, skip=skip, limit=limit)
    return samples