import { useEffect, useState } from "react"

function GroupCard(props) {
  const [expanded, setExpanded] = useState(false)

  let toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1)
    })
  }

  let tags = (props.tags && props.tags.map(tag => (
    <span className="tag is-rounded has-text-weight-semibold has-text-dark"
      key={tag}>
      {toTitleCase(tag)}
    </span>
  )))

  let handleSelect = () => {
    props.setColTitle(props.title)
    props.setColDescription(props.description)
    props.setColTags(props.tags)
    props.setColCreator(props.creator)
    props.setColLocation(props.location)
    props.setColDate(props.date)
    props.setColDays(props.days)
    props.setColCap(props.cap)
    props.setColSocial(props.social)
    if (props.setColMembers) {
      props.setColMembers(props.members)
    }
    if (props.setColEvent && props.event) {
      props.setColEvent(true)
    } else if (props.setColEvent && !props.event) {
      props.setColEvent(false)
    }

    if (props.setColGroupID) {
      if (props.colVisible && expanded) {
        setExpanded(false)
        props.setColGroupID(null)
        props.setColVisible(false)
      } else {
        props.setColGroupID(props.created)
        setExpanded(true)
        props.setColVisible(true)
      }
    }
  }

  useEffect(() => {
    if (props.colGroupID !== props.created) {
      setExpanded(false)
    }
  }, [props.colGroupID, props.created])

  useEffect(() => {
    if (props.index === 0 && props.amCreator) {
      handleSelect()
    }
  }, [props.index, props.title, props.amCreator])

  return (
    <article className="media my-5 is-clickable" onClick={() => handleSelect()}>
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={require("../assets/profile_pic.png")} alt="face" />
        </p>
      </figure>
      <div className="media-content">
        <p className="mb-2">
          <strong className="has-text-black">{props.title}</strong>
        </p>
        {expanded ?
          (
            <p className='is-text-gray'>
              <i>Information expanded</i>
            </p>
          )
          :
          (
            <>
              <p className='mb-4'>
                {props.description}
              </p>
              <div className="tags">
                {props.event &&
                  <span className="tag is-rounded has-text-weight-semibold has-text-white is-event">
                    {props.social ? 'Social Event' : 'Study Event'}
                  </span>
                }
                {!props.event &&
                  <span className="tag is-rounded has-text-weight-semibold has-text-white is-success">
                    {props.social ? 'Social Group' : 'Study Group'}
                  </span>
                }
                {tags}

              </div>
            </>
          )
        }
      </div >
    </article >
  )
}

export default GroupCard;