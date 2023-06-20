from pydantic import BaseModel

class SampleBase(BaseModel):
    sample_label: str
    proposal_number: str
    inner_diameter: float
    outer_diameter: float

class SampleCreate(SampleBase):
    pass

class Sample(SampleBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    name: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    samples: list[Sample] = []

    class Config:
        orm_mode = True