/* 
  function to read the story object and get the corresponding color.

  grey: past
  red: missing at least one of: author, 

*/
import {DateTime} from 'luxon'

export function makeStatusColor(story) {
  if (story.publication_date < DateTime.now()) return 'grey'
  return 'blue'
}