import * as React from 'react';

import Tag from '../Tag/Tag';

export default function ListTags(props) {
    const removeTag = (tag) => {
        props.removeTag(tag.id);
    }

    let defaultTags = [
        { id: 0, name: 'tag0', description: 'first tag' },
        { id: 1, name: 'tag1', description: 'second tag' },
        { id: 2, name: 'tag2', description: 'third tag' },
        { id: 3, name: 'tag3', description: 'fourth tag' },
        { id: 4, name: 'tag4', description: 'fifth tag' },
        { id: 5, name: 'tag5', description: 'sixth tag' },
    ]

    // props
    let tagsArray = props.tags || defaultTags;
    let numToDisplay = props.numOfDisplay || 2;

    return (
        <div>
            {tagsArray[0] != null ?
                <>{tagsArray.slice(0, numToDisplay).map((tag, index) => {
                    return (
                        <Tag tag={tag} index={index} key={tag.id} removeTag ={removeTag} />
                        // create new component and prop down. also click away
                    )
                })}
                </>
                :
                <></>

            }
        </div>
    )
}