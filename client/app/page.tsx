'use client'
import { useState } from 'react'
import Image from 'next/image'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

interface formData {
	user: string
	sample_label: string
	proposal_number: string
	inner_diameter: number
	outer_diameter: number
}

const dummyUsers = [
	{ id: 1, name: 'John Doe' },
	{ id: 2, name: 'Jane Doe' },
	{ id: 3, name: 'John Smith' },
	{ id: 4, name: 'Jane Smith' },
	{ id: 5, name: 'Janice Danice' }
]

export default function Form() {
	const [formData, setFormData] = useState({
		user: '',
		sample_label: '',
		proposal_number: '',
		inner_diameter: 0,
		outer_diameter: 0
	})

	const handleSelectChange = (event: SelectChangeEvent) => {
		setFormData({
			...formData,
			user: event.target.value as string
		})
	}
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		console.log({
			user: formData.user,
			sample_label: formData.sample_label,
			proposal_number: formData.proposal_number,
			inner_diameter: formData.inner_diameter,
			outer_diameter: formData.outer_diameter
		})
	}

	return (
		<Container component='main' maxWidth='sm'>
			<Box
				sx={{
					boxShadow: 3,
					borderRadius: 2,
					px: 4,
					py: 4,
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<a
					href='https://www.modelyst.com/'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Image
						src='/modelyst-logo.svg'
						alt='Modelyst Logo'
						width={200}
						height={48}
						priority
					/>
				</a>
				<Typography component='h1' variant='h5'>
					Scientific Sample Registration Form
				</Typography>
				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<FormControl fullWidth>
						<InputLabel id='userLabel'>Select User *</InputLabel>
						<Select
							labelId='userLabel'
							label='Select User'
							value={formData.user}
							onChange={handleSelectChange}
						>
							{dummyUsers.map((user) => (
								<MenuItem key={user.id} value={user.name}>
									{user.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						margin='normal'
						required
						fullWidth
						label='Sample Label'
						name='sample_label'
						onChange={handleInputChange}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						label='Proposal Number'
						name='proposal_number'
						onChange={handleInputChange}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						type='number'
						label='Inner Diameter (mm)'
						name='inner_diameter'
						onChange={(e) =>
							setFormData({
								...formData,
								inner_diameter: parseFloat(e.target.value)
							})
						}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						type='number'
						label='Outer Diameter (mm)'
						name='outer_diameter'
						onChange={(e) =>
							setFormData({
								...formData,
								outer_diameter: parseFloat(e.target.value)
							})
						}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 2, mb: 1 }}
					>
						Submit
					</Button>
				</Box>
			</Box>
		</Container>
	)
}
