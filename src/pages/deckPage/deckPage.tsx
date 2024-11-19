import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FiArrowLeft, FiEdit, FiPlayCircle, FiTrash } from 'react-icons/fi'

import style from './deckPage.module.scss'

import coverImg from '../../assets/images/cover.svg'
import { Button } from '../../components/ui/button/button'
import { DropdownItem, DropdownMenu } from '../../components/ui/dropdownMenu/dropdownMenu'
import { LoadingBar } from '../../components/ui/loadingBar/loadingBar'
import { Typography } from '../../components/ui/typography/typography'
import { useMeQuery } from '../../features/auth/authApi'
import {
  useDeleteDeckMutation,
  useGetDeckQuery,
  useUpdateDeckMutation,
} from '../../features/decks/decksApi'
import { DeckBody } from '../../features/decks/decksTypes'
import { path } from '../../routes/path'
import { DecksDialog, DeleteDeckDialog } from '../decksPage/decksDialog/decksDialog'

export const DeckPage = () => {
  const navigate = useNavigate()
  const { id } = useParams() as { id: string }

  const { data, isLoading } = useGetDeckQuery({ id })
  const { data: me } = useMeQuery()
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const isOwner = data?.userId === me?.id

  const onUpdateDeckHandler = async (args: { id: string } & DeckBody) => {
    try {
      await updateDeck(args).unwrap()
      toast.success('Deck updated')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const onDeleteDeck = async (id: string) => {
    try {
      await deleteDeck(id).unwrap()
      navigate(path.decks)
      toast.success('Deck successfully deleted')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

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
          <DropdownItem
            onSelect={event => {
              event.preventDefault()
            }}
          >
            <div className={style.dropdownItem}>
              <FiPlayCircle />
              Learn
            </div>
          </DropdownItem>

          {isOwner && (
            <>
              <DropdownItem
                onSelect={event => {
                  event.preventDefault()
                }}
              >
                <DecksDialog
                  cover={data?.cover}
                  isPrivate={data?.isPrivate}
                  name={data?.name}
                  onSubmit={body => onUpdateDeckHandler({ id, ...body })}
                  title={'Update Deck'}
                >
                  <div className={style.dropdownItem}>
                    <FiEdit />
                    Edit
                  </div>
                </DecksDialog>
              </DropdownItem>

              <DropdownItem
                onSelect={event => {
                  event.preventDefault()
                }}
              >
                <DeleteDeckDialog name={data?.name} onDelete={() => onDeleteDeck(id)}>
                  <div className={style.dropdownItem}>
                    <FiTrash />
                    Delete
                  </div>
                </DeleteDeckDialog>
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </div>

      <img alt={'cover'} className={style.cover} src={data?.cover ? data?.cover : coverImg} />
    </div>
  )
}
