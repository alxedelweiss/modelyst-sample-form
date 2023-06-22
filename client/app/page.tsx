'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Tooltip from '@mui/material/Tooltip'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Slide, { SlideProps } from '@mui/material/Slide'
import Zoom from '@mui/material/Zoom'
// import {
// 	useQuery,
// 	useQueryClient,
// 	QueryClient,
// 	QueryClientProvider
// } from '@tanstack/react-query'

// local imports
import MaterialUISwitch from './components/switch'
import { formData, touched, activateToast, user, users } from './interfaces'
import { lightTheme, darkTheme } from './components/themes'
import Alert from './components/alert'

// const dummyUsers = [
// 	{ id: 1, name: 'John Doe' },
// 	{ id: 2, name: 'Jane Doe' },
// 	{ id: 3, name: 'John Smith' },
// 	{ id: 4, name: 'Jane Smith' },
// 	{ id: 5, name: 'Janice Danice' }
// ]

export default function Form(): JSX.Element {
	// state type interfaces are defined in ./interfaces.ts

	// formData is a stateful object that contains the scientific sample form data
	const [formData, setFormData] = useState<formData>({
		user: '',
		sample_label: '',
		proposal_number: '',
		inner_diameter: 0,
		outer_diameter: 0
	})

	// touched is a stateful object that is used to determine if a field has been touched/visited
	const [touched, setTouched] = useState<touched>({
		user: false,
		sample_label: false,
		proposal_number: false,
		inner_diameter: false,
		outer_diameter: false
	})

	// 'activateToast' is a stateful object that is used to determine if a toast should be displayed
	// e.g.: if the form is submitted successfully or not
	const [activateToast, setActivateToast] = useState<activateToast>({
		visible: false,
		severity: 'success',
		message: ''
	})

	// 'activeTheme' is a stateful theme object that is used to determine if the theme is light or dark
	const [activeTheme, setActiveTheme] = useState<
		typeof lightTheme | typeof darkTheme
	>(lightTheme)

	// 'users' is a stateful array of <user> objects fetched from the API
	const [users, setUsers] = useState<users>([])

	// 'useEffect' is a function that is used to fetch the users from the API
	// I opted for this method instead of using react-query
	useEffect(() => {
		fetch('/users').then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					setUsers(data)
					setActivateToast({
						visible: true,
						severity: 'success',
						message: 'Users fetched successfully!'
					})
				})
			} else {
				setActivateToast({
					visible: true,
					severity: 'error',
					message: 'Failed to fetch users.'
				})
			}
		})
	}, [])

	// 'handleBlur' is a function that is used to determine if a field has been touched/visited
	// e.g.: if the user has visited the field and left it empty, then the field is invalid
	const handleBlur = (event: React.FocusEvent) => {
		const { name }: any = event.target
		setTouched({
			...touched,
			[name]: true // set the field to touched
		})
	}

	// 'handleSelectChange' is a function that is used to control the user dropdown menu
	const handleSelectChange = (event: SelectChangeEvent) => {
		setFormData({
			...formData,
			user: event.target.value // set the user to the selected value
		})
	}

	// 'handleInputChange' is a function that is used to control the text fields
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setFormData({ ...formData, [name]: value }) // set the field to the value
	}

	// 'handleClose' is a function that is used to close the toast
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

	// 'handleSubmit' is a function that is used to handle submission of the form
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		// if any of the fields are invalid or empty, then display an error toast
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
				message: 'Please fill out the form.'
			})
			setTouched({
				user: true,
				sample_label: true,
				proposal_number: true,
				inner_diameter: true,
				outer_diameter: true
			})
			return
		} else {
			// if all the fields are valid, then attempt to submit the form
			fetch(
				`/users/${
					//@ts-ignore
					users.find((user) => user.name === formData.user).id
				}/samples`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				}
			).then((res) => {
				// if the form is submitted successfully, then display a success toast and reset the form
				if (res.ok) {
					setActivateToast({
						visible: true,
						severity: 'success',
						message: 'Form submitted successfully!'
					})
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
				} else {
					// if the form is not submitted successfully, then display an error toast with a message from the API
					res.json().then((data) => {
						setActivateToast({
							visible: true,
							severity: 'error',
							message: data.detail
						})
					})
				}
			})
		}
	}
	//////////////////////////////////////////////////////////////////////////////////////////
	// 'validations' is an object that is used to determine if a field is valid or not			//
	// each field has a state(boolean) and a helperText:																		//
	// · the state is used to determine if the field is valid or not												//
	// · the helperText is used to display a message to the user if the field is invalid		//
	//////////////////////////////////////////////////////////////////////////////////////////
	const validations = {
		user: {
			state: touched.user && formData.user === '',
			helperText:
				touched.user && formData.user === ''
					? 'You need to specify a user'
					: ' ' // if the field is valid, then the empty string serves as a placeholder for the helperText
		},
		sample_label: {
			state: touched.sample_label && formData.sample_label.length === 0,
			helperText:
				touched.sample_label && formData.sample_label.length === 0
					? 'You need to specify a sample label'
					: ' '
		},
		proposal_number: {
			state: touched.proposal_number && formData.proposal_number.length === 0,
			helperText:
				touched.proposal_number && formData.proposal_number.length === 0
					? 'You need to specify a proposal number'
					: ' '
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
					formData.inner_diameter >= formData.outer_diameter)
					? 'Inner diameter must be a valid number greater than 0 and lesser than outer diameter'
					: ' '
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
					formData.inner_diameter >= formData.outer_diameter)
					? 'Outer diameter must be a valid number greater than 0 and greater than inner diameter'
					: ' '
		}
	}
	////////////////////////////////////////////////////////
	// React-query method; it works, but it's not optimal //
	////////////////////////////////////////////////////////

	// const queryClient = new QueryClient()
	// const FetchUsers = () => {
	// 	const { data } = useQuery({
	// 		queryKey: ['users'],
	// 		queryFn: async () => {
	// 			const response = await fetch('/users/')
	// 			if (!response.ok) throw new Error('Network response was not ok')
	// 			return response.json()
	// 		},
	// 		//trying to avoid refetching
	// 		refetchIntervalInBackground: false,
	// 		refetchOnMount: false,
	// 		refetchOnWindowFocus: false,
	// 		refetchInterval: false,
	// 		refetchOnReconnect: false,
	// 		retry: false,
	// 		retryDelay: 1000,
	// 		retryOnMount: false,
	// 		retryOnWindowFocus: false,
	// 		staleTime: 1000 * 60 * 60 * 24, // 24 hours
	// 		notifyOnChangeProps: ['data'],
	// 		keepPreviousData: true
	// 	})

	// 	return (
	// 		<Tooltip
	// 			title='Select a user from the dropdown menu'
	// 			arrow
	// 			TransitionComponent={Zoom}
	// 		>
	// 			<FormControl fullWidth>
	// 				<InputLabel id='userLabel'>Select User *</InputLabel>
	// 				<Select
	// 					labelId='userLabel'
	// 					label='Select User'
	// 					name='user'
	// 					value={formData.user}
	// 					onBlur={handleBlur}
	// 					onChange={handleSelectChange}
	// 					error={validations.user.state}
	// 				>
	// 					{data?.map((user: any) => (
	// 						<MenuItem key={user.id} value={user.name}>
	// 							{user.name}
	// 						</MenuItem>
	// 					))}
	// 				</Select>
	// 				<FormHelperText error>{validations.user.helperText}</FormHelperText>
	// 			</FormControl>
	// 		</Tooltip>
	// 	)
	// }

	return (
		// <QueryClientProvider client={queryClient}>
		<ThemeProvider theme={activeTheme}>
			<CssBaseline />
			<Container component='main' maxWidth='sm'>
				<Box
					sx={{
						boxShadow: 5,
						borderRadius: 4,
						border: 1,
						borderColor: 'primary.main',
						px: 4,
						py: 4,
						marginTop: 4,
						marginBottom: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Tooltip
						title='Change between light and dark mode'
						arrow
						TransitionComponent={Zoom}
					>
						<FormControlLabel
							control={
								<MaterialUISwitch
									autoFocus
									sx={{ m: 1 }}
									checked={activeTheme === darkTheme}
									onChange={() =>
										setActiveTheme(
											activeTheme === lightTheme ? darkTheme : lightTheme
										)
									}
								/>
							}
							label=''
						/>
					</Tooltip>
					<Tooltip title='Visit modelyst.com' arrow TransitionComponent={Zoom}>
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
					</Tooltip>
					<Typography component='h1' variant='h5'>
						Scientific Sample Registration Form
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						noValidate // disable HTML5 validation
						sx={{ mt: 1 }}
					>
						<Tooltip
							title='Select a user from the dropdown menu'
							arrow
							TransitionComponent={Zoom}
						>
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
									{users?.map((usr: user) => (
										<MenuItem key={usr.id} value={usr.name}>
											{usr.name}
										</MenuItem>
									))}
								</Select>
								<FormHelperText error>
									{validations.user.helperText}
								</FormHelperText>
							</FormControl>
						</Tooltip>
						{/* <FetchUsers /> */}
						<Tooltip
							title='Fill out a sample label'
							arrow
							TransitionComponent={Zoom}
						>
							<TextField
								margin='normal'
								required
								fullWidth
								label='Sample Label'
								name='sample_label'
								value={formData.sample_label}
								onBlur={handleBlur} // when the field is blurred, then set the field to touched
								onChange={handleInputChange}
								error={validations.sample_label.state} // if the field is invalid, then display an error
								helperText={validations.sample_label.helperText} // if the field is invalid, then display a message
							/>
						</Tooltip>
						<Tooltip
							title='Fill out a proposal number'
							arrow
							TransitionComponent={Zoom}
						>
							<TextField
								margin='normal'
								required
								fullWidth
								label='Proposal Number'
								name='proposal_number'
								value={formData.proposal_number}
								onBlur={handleBlur}
								onChange={handleInputChange}
								error={validations.proposal_number.state}
								helperText={validations.proposal_number.helperText}
							/>
						</Tooltip>
						<Tooltip
							title='Fill out an inner diameter'
							arrow
							TransitionComponent={Zoom}
						>
							<TextField
								margin='normal'
								required
								fullWidth
								type='number'
								InputProps={{
									inputProps: { min: 0, step: 0.1 }
								}}
								label='Inner Diameter (mm)'
								id='inner_diameter'
								name='inner_diameter'
								value={formData.inner_diameter.toString()}
								onBlur={handleBlur}
								onChange={(e) =>
									setFormData({
										...formData,
										inner_diameter: parseFloat(e.target.value) // convert the value to a float
									})
								}
								error={validations.inner_diameter.state}
								helperText={validations.inner_diameter.helperText}
							/>
						</Tooltip>
						<Tooltip
							title='Fill out an outer diameter'
							arrow
							TransitionComponent={Zoom}
						>
							<TextField
								margin='normal'
								required
								fullWidth
								type='number'
								InputProps={{
									inputProps: { min: 0, step: 0.1 }
								}}
								label='Outer Diameter (mm)'
								name='outer_diameter'
								value={formData.outer_diameter.toString()}
								onBlur={handleBlur}
								onChange={(e) =>
									setFormData({
										...formData,
										outer_diameter: parseFloat(e.target.value) // convert the value to a float
									})
								}
								error={validations.outer_diameter.state}
								helperText={validations.outer_diameter.helperText}
							/>
						</Tooltip>
						<Tooltip title='Submit the form' arrow TransitionComponent={Zoom}>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 2, mb: 1 }}
							>
								Submit
							</Button>
						</Tooltip>
					</Box>
				</Box>
				<Snackbar
					open={activateToast.visible}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					TransitionComponent={(props: Omit<SlideProps, 'direction'>) => (
						<Slide {...props} direction='up' />
					)}
					autoHideDuration={3500}
					onClose={handleClose}
				>
					<Alert
						onClose={handleClose}
						severity={activateToast.severity}
						sx={{ width: '100%' }}
					>
						{activateToast.message}
					</Alert>
				</Snackbar>
			</Container>
		</ThemeProvider>
		// </QueryClientProvider>
	)
}
