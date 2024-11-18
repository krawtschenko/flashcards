import { useNavigate, useParams } from 'react-router-dom'

import { FiArrowLeft, FiEdit, FiPlayCircle, FiTrash } from 'react-icons/fi'

import style from './deckPage.module.scss'

import coverImg from '../../assets/images/cover.svg'
import { Button } from '../../components/ui/button/button'
import { DropdownItem, DropdownMenu } from '../../components/ui/dropdownMenu/dropdownMenu'
import { LoadingBar } from '../../components/ui/loadingBar/loadingBar'
import { Typography } from '../../components/ui/typography/typography'
import { useGetDeckQuery } from '../../features/decks/decksApi'
import { DecksDialog } from '../decksPage/decksDialog/decksDialog'

type DeckPageProps = {}

export const DeckPage = ({}: DeckPageProps) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading } = useGetDeckQuery({ id })

  if (isLoading) {
    return <LoadingBar id={'loader-root'} loading={isLoading} />
  }

  return (
    <div className={style.deckPage}>
      <Button className={style.back} onClick={() => navigate(-1)}>
        <FiArrowLeft />
        Back to Decks List
      </Button>

      <div className={style.deckName}>
        <Typography variant={'h1'}>{data?.name}</Typography>

        <DropdownMenu variant={'icon'}>
          <DropdownItem>
            <FiPlayCircle />
            Learn
          </DropdownItem>

          <DropdownItem>
            <DecksDialog onSubmit={() => {}} title={'Add New Deck'}>
              <Button>
                <FiEdit />
                Edit
              </Button>
            </DecksDialog>
          </DropdownItem>

          <DropdownItem>
            <FiTrash />
            Delete
          </DropdownItem>
        </DropdownMenu>
      </div>

      <img alt={'cover'} className={style.cover} src={data?.cover ? data?.cover : coverImg} />
    </div>
  )
}
