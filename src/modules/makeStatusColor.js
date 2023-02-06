/* 
  function to read the story object and get the corresponding color.

  grey: past
  red: missing at least one of: author, 

*/
import { DateTime } from 'luxon'

export function makeStatusColor(story) {
  // console.log('publication date', story)


  //! BUG: this errors if there are no contacts attached to the story
  const hasAuthor = !!story.contacts?.filter(contact => contact?.role === 'author').length
  // console.log('author?', hasAuthor)

  const paymentRequired = !!story.contacts?.filter(contact => contact?.invoice_amount > 0).length
  // console.log('payment required?', paymentRequired)




  // console.log('publication date', story.publication_date)

  // const hasAuthor = true;
  
  // !!story.contacts?.filter(contact => contact.role === 'author').length
  // console.log('author?', hasAuthor)

  // const paymentRequired = !!story.contacts?.filter(contact=>contact.invoice_amount>0).length
  console.log('payment required?', paymentRequired)

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
      status: story.photo_required,
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
      status: paymentRequired,
      complete: story.payment_completed,
    },
  ].filter(piece => piece.status);
  // console.log(piecesToTrack);

  const piecesReady = !piecesToTrack.filter(piece => !piece.complete).length
  // console.log('pieces ready', piecesReady);
  // const piecesReady = !piecesToTrack.filter(piece=>!piece.complete).length
  // console.log('pieces ready', piecesReady);

  if (story.publication_date < DateTime.now().toISO()) return { color: 'grey', notes: 'story is complete and past' }

  // need to add deadlines and author to progress from red to yellow
  if (!story.rough_draft_deadline || !story.final_draft_deadline || !hasAuthor) return { color: 'red', notes: 'story is missing a rough draft deadline, final draft deadline, or author' }
  if (!piecesReady) return { color: 'yellow', notes: 'story has key info ready but is missing some to-do tasks' }
  if (piecesReady) return { color: 'green', notes: 'story is ready to publish!' }

  return { color: 'purple', notes: 'ummm something went wrong...' }
}