import { AlertColor } from '@mui/material/Alert'

export interface formData {
	user: string
	sample_label: string
	proposal_number: string
	inner_diameter: number
	outer_diameter: number
}

export interface touched {
	user: boolean
	sample_label: boolean
	proposal_number: boolean
	inner_diameter: boolean
	outer_diameter: boolean
}

export interface activateToast {
	visible: boolean
	severity: AlertColor
	message: string
}

export interface user {
  id: number
  name: string
}
export interface users extends Array<user> {}