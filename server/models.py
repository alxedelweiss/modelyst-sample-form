from sqlalchemy import Column, ForeignKey, Integer, Float, String
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    samples = relationship("Sample", back_populates="owner")


class Sample(Base):
    __tablename__ = "samples"

    id = Column(Integer, primary_key=True, index=True)
    sample_label = Column(String, unique=True, index=True)
    proposal_number = Column(String, index=True)
    inner_diameter = Column(Float, index=True)
    outer_diameter = Column(Float, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="samples")