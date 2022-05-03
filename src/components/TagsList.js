import db from '../firebase/firebase'
import { collection, getDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function TagsList(props) {

    const [tags, setTags] = useState([])
    const name = props.name;

    useEffect(() => {
        async function fetchTags() {
            const docRef = doc(db, "tags", name);
            const response = await getDoc(docRef);
            if (response.exists()) {
                console.log(response.data());
            } else {
                console.log("no such doc");
            }

        }
        fetchTags();
    })

    return (
        <div className="tags are-small">
        </div>
    )
}