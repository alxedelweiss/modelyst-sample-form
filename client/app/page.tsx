'use client'
import { useState, forwardRef } from 'react'
import Image from 'next/image'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Slide, { SlideProps } from '@mui/material/Slide'

interface formData {
	user: string
	sample_label: string
	proposal_number: string
	inner_diameter: number
	outer_diameter: number
}

interface touched {
	user: boolean
	sample_label: boolean
	proposal_number: boolean
	inner_diameter: boolean
	outer_diameter: boolean
}

interface activateToast {
	visible: boolean
	severity: string
	message: string
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

type TransitionProps = Omit<SlideProps, 'direction'>

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

	const [touched, setTouched] = useState({
		user: false,
		sample_label: false,
		proposal_number: false,
		inner_diameter: false,
		outer_diameter: false
	})

	const [activateToast, setActivateToast] = useState({
		visible: false,
		severity: '',
		message: ''
	})

	const handleBlur = (event: React.FocusEvent) => {
		const { name }: any = event.target
		setTouched({
			...touched,
			[name]: true
		})
	}

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

		if (
			validations.user.state ||
			validations.sample_label.state ||
			validations.proposal_number.state ||
			validations.inner_diameter.state ||
			validations.outer_diameter.state ||
			formData.user === '' ||
			formData.sample_label === '' ||
			formData.proposal_number === '' ||
			formData.inner_diameter === 0 ||
			formData.outer_diameter === 0
		) {
			setActivateToast({
				visible: true,
				severity: 'error',
				message: 'Form is invalid'
			})
			return
		} else {
			setActivateToast({
				visible: true,
				severity: 'success',
				message: 'Form is valid'
			})
			console.log({
				user: formData.user,
				sample_label: formData.sample_label,
				proposal_number: formData.proposal_number,
				inner_diameter: formData.inner_diameter,
				outer_diameter: formData.outer_diameter
			})
		}
		setFormData({
			user: '',
			sample_label: '',
			proposal_number: '',
			inner_diameter: 0,
			outer_diameter: 0
		})
		setTouched({
			user: false,
			sample_label: false,
			proposal_number: false,
			inner_diameter: false,
			outer_diameter: false
		})
	}

	const validations = {
		user: {
			state: touched.user && formData.user === '',
			helperText:
				touched.user && formData.user === '' && 'You need to specify a user'
		},
		sample_label: {
			state: touched.sample_label && formData.sample_label.length === 0,
			helperText:
				touched.sample_label &&
				formData.sample_label.length === 0 &&
				'You need to specify a sample label'
		},
		proposal_number: {
			state: touched.proposal_number && formData.proposal_number.length === 0,
			helperText:
				touched.proposal_number &&
				formData.proposal_number.length === 0 &&
				'You need to specify a proposal number'
		},
		inner_diameter: {
			state:
				touched.inner_diameter &&
				touched.outer_diameter &&
				(Number.isNaN(formData.inner_diameter) ||
					formData.inner_diameter <= 0 ||
					formData.inner_diameter >= formData.outer_diameter),
			helperText:
				touched.inner_diameter &&
				touched.outer_diameter &&
				(Number.isNaN(formData.inner_diameter) ||
					formData.inner_diameter <= 0 ||
					formData.inner_diameter >= formData.outer_diameter) &&
				'Inner diameter must be a valid number greater than 0 and less than outer diameter'
		},
		outer_diameter: {
			state:
				touched.inner_diameter &&
				touched.outer_diameter &&
				(Number.isNaN(formData.outer_diameter) ||
					formData.outer_diameter <= 0 ||
					formData.inner_diameter >= formData.outer_diameter),
			helperText:
				touched.inner_diameter &&
				touched.outer_diameter &&
				(Number.isNaN(formData.outer_diameter) ||
					formData.outer_diameter <= 0 ||
					formData.inner_diameter >= formData.outer_diameter) &&
				'Outer diameter must be a valid number greater than 0 and greater than inner diameter'
		}
	}

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return
		}
		setActivateToast({
			...activateToast,
			visible: false
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
							name='user'
							value={formData.user}
							onBlur={handleBlur}
							onChange={handleSelectChange}
							error={validations.user.state}
						>
							{dummyUsers.map((user) => (
								<MenuItem key={user.id} value={user.name}>
									{user.name}
								</MenuItem>
							))}
						</Select>
						<FormHelperText error>
							{validations.user.helperText ? validations.user.helperText : ' '}
						</FormHelperText>
					</FormControl>
					<TextField
						margin='normal'
						required
						fullWidth
						label='Sample Label'
						name='sample_label'
						value={formData.sample_label}
						onBlur={handleBlur}
						onChange={handleInputChange}
						error={validations.sample_label.state}
						helperText={
							validations.sample_label.helperText
								? validations.sample_label.helperText
								: ' '
						}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						type='number'
						label='Proposal Number'
						name='proposal_number'
						value={formData.proposal_number}
						onBlur={handleBlur}
						onChange={handleInputChange}
						error={validations.proposal_number.state}
						helperText={
							validations.proposal_number.helperText
								? validations.proposal_number.helperText
								: ' '
						}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						type='number'
						label='Inner Diameter (mm)'
						id='inner_diameter'
						name='inner_diameter'
						value={formData.inner_diameter}
						onBlur={handleBlur}
						onChange={(e) =>
							setFormData({
								...formData,
								inner_diameter: parseFloat(e.target.value)
							})
						}
						error={validations.inner_diameter.state}
						helperText={
							validations.inner_diameter.helperText
								? validations.inner_diameter.helperText
								: ' '
						}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						type='number'
						label='Outer Diameter (mm)'
						name='outer_diameter'
						value={formData.outer_diameter}
						onBlur={handleBlur}
						onChange={(e) =>
							setFormData({
								...formData,
								outer_diameter: parseFloat(e.target.value)
							})
						}
						error={validations.outer_diameter.state}
						helperText={
							validations.outer_diameter.helperText
								? validations.outer_diameter.helperText
								: ' '
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
			<Snackbar
				open={activateToast.visible}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				TransitionComponent={(props: TransitionProps) => (
					<Slide {...props} direction='up' />
				)}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose} // @ts-ignore
					severity={activateToast.severity}
					sx={{ width: '100%' }}
				>
					{activateToast.message}
				</Alert>
			</Snackbar>
		</Container>
	)
}
