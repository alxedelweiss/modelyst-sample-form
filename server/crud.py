from sqlalchemy.orm import Session
from . import models, schemas

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_name(db: Session, name: str):
    return db.query(models.User).filter(models.User.name == name).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_samples(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Sample).offset(skip).limit(limit).all()

def get_sample_by_label(db: Session, sample_label: str):
    return db.query(models.Sample).filter(models.Sample.sample_label == sample_label).first()

def create_user_sample(db: Session, sample: schemas.SampleCreate, user_id: int):
    db_item = models.Sample(**sample.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item