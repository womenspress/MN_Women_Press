import { DateTime } from 'luxon'

export function makeStatusColor(story) {

  const hasAuthor = !!story.contacts?.filter(contact => contact?.story_association === 'author').length

  const piecesToTrack = [
    {
      name: 'copies sent',
      name_db: 'copies_sent',
      status: story.copies_required,
      complete: story.copies_sent,
    },
    {
      name: 'upload photo',
      name_db: 'photo_uploaded',
      status: true,
      complete: story.photo_uploaded,
    },
    {
      name: 'fact-check story',
      name_db: 'fact_check_completed',
      status: story.fact_check_required,
      complete: story.fact_check_completed,
    },
    {
      name: 'upload graphic',
      name_db: 'graphic_image_completed',
      status: story.graphic_image_required,
      complete: story.graphic_image_completed,
    },
    {
      name: 'make payments',
      name_db: 'payment_completed',
      status: story.payment_required,
      complete: story.payment_completed,
    },
    {
      name: 'post social',
      name_db: 'socials_completed',
      status: story.socials_required,
      complete: story.socials_completed,
    },
    {
      name: 'underwritten',
      name_db: 'underwriter_required',
      status: story.underwriter_required,
      complete: story.underwriter_completed,
    },
  ].filter(piece => piece.status);

  const piecesReady = !piecesToTrack.filter(piece => !piece.complete).length

  // need to add deadlines and author to progress from red to yellow
  if ((story.publication_date === story.rough_draft_deadline) && (story.final_draft_deadline === story.publication_date) && !piecesReady) return { color: 'grey.100', notes: 'story has not been assigned deadlines' }

  // red
  if (story.publication_date === story.date_added || !hasAuthor) return { color: '#b30000', notes: 'story is missing deadlines or an author' }

  // yellow
  if (!piecesReady) return { color: '#fff633', notes: 'story has key info ready but is missing some to-do tasks' }

  if (story.publication_date < DateTime.now().toISO() && piecesReady) return { color: 'grey', notes: 'story is complete and past' }

  // green
  if (piecesReady) return { color: '#008000', notes: 'story is ready to publish!' }

  return { color: 'purple', notes: 'ummm something went wrong...' }
}