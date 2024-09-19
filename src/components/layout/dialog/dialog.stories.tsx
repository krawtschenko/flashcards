import { useState } from 'react'

import { Meta } from '@storybook/react'

import { Button } from '../../ui/button/button'
import { Dialog, DialogPortal, DialogTrigger } from './dialog'

const meta = {
  component: Dialog,
  tags: ['autodocs'],
  title: 'Layout/Dialog',
} satisfies Meta<typeof Dialog>

export default meta

export const Primary = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <Dialog open={isOpen}>
        <DialogTrigger>
          <Button>Test dialog</Button>
        </DialogTrigger>

        <DialogPortal setIsOpen={setIsOpen} title={'Dialog'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad adipisci, aut
          delectus dolor dolorem doloribus ea earum eius, exercitationem ipsam omnis, perspiciatis
          quis tempora tenetur unde ut veritatis voluptatibus?
        </DialogPortal>
      </Dialog>
    )
  },
}
