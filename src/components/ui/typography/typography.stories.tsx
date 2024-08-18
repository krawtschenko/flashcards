import { Meta } from '@storybook/react'

import { Typography } from './typography'

const meta = {
  component: Typography,
  tags: ['autodocs'],
  title: 'UI/Typography',
} as Meta<typeof Typography>

export default meta

export const AllTypography = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant={'h1'}>Heading 1</Typography>
      <Typography variant={'h2'}>Heading 2</Typography>
      <Typography variant={'h3'}>Heading 3</Typography>
      <Typography variant={'h4'}>Heading 4</Typography>

      <Typography variant={'body1'}>Body 1</Typography>
      <Typography variant={'subtitle1'}>Subtitle 1</Typography>
      <Typography variant={'body2'}>Body 2</Typography>
      <Typography variant={'subtitle2'}>Subtitle 2</Typography>

      <Typography variant={'caption'}>Caption</Typography>
      <Typography variant={'overline'}>Overline</Typography>
      <Typography style={{ color: '#4c8dff' }} variant={'link1'}>
        Link 1
      </Typography>
      <Typography style={{ color: '#4c8dff' }} variant={'link2'}>
        Link 2
      </Typography>

      <Typography style={{ color: '#f23d61' }} variant={'body1'}>
        Error Body 1
      </Typography>
    </div>
  ),
}
