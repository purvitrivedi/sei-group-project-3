import React from 'react'
import { getUserId } from '../../lib/auth'
import { Link } from 'react-router-dom'


const GroupShowEvents = ({ events, group, currentlyDisplayed, handleEventDelete, handleJoinEvent, handleCancelEvent }) => {

  const userId = getUserId()

  const isInGroup = (participants) => {
    return participants.some(person => person.user._id === userId)
  }

  return (
    <section className="section">
      <div 
        className="container"    
        style={{ 
          minHeight: 500,
          display: `${currentlyDisplayed === 'events' ? 'block' : 'none' }` 
        }}
      >
        <h1 className="subtitle">Events</h1>
        {events.map(item => {
          const numOfPs = item.participants.length
          const participantId = item.participants.find(par => par.user._id === userId)
          return(
                <section className="section box" key={item._id}>
                  {item.createdMember._id === getUserId() && 
                    <div className="buttons is-right">
                      <Link to={`/groups/${group._id}/events/${item._id}/edit`} className="button is-small">
                        Edit event
                      </Link>
                      <button className="button is-small" value={item._id} onClick={handleEventDelete}>
                        Delete
                      </button>
                    </div>
                  }

                  <h1 className="subtitle"><strong>{item.eventName}</strong></h1>
                  {item.hike &&
                    <>
                      <p>Course:&nbsp;{item.hike.hikeName} &nbsp;<Link to={`/hikes/${item.hike.hikePage}`}><i className="fas fa-flag"></i></Link></p>
                      <p style={{fontSize: 12}}>&nbsp;&nbsp;&nbsp;<i className="fas fa-hiking"></i>&nbsp;{item.hike.difficulty}</p>
                      <p style={{fontSize: 12}}>&nbsp;&nbsp;&nbsp;<i className="fas fa-globe"></i>&nbsp;{item.hike.country}</p>
                    </>
                  }
                  <br />
                  <p style={{fontSize: 12}}> ~&nbsp;{item.description} ~</p>
                  <hr />
                  <p>Event Host:&nbsp;<strong>{item.createdMember.username}</strong></p>
                  <Link to={`/profiles/${item.createdMember._id}`}>
                    <figure className="image is-rounded is-64x64">
                      <img className="is-rounded" src={item.createdMember.profileImage} alt={item.createdMember.username} />
                    </figure>
                  </Link>
                  <br />
                  {numOfPs > 1 ?
                    <p style={{fontSize: 15}}>{`${numOfPs} members will participate`}</p> 
                    :
                    <p style={{fontSize: 15}}>Be the first participant!</p>
                  }
                  {numOfPs > 1 && 
                    <div className="columns">
                      {item.participants.map(par => {
                        return (
                          <div class="column" key={par._id}>
                            <figure class="image is-128x128">
                              <img class="is-rounded" src={par.user.profileImage} />
                            </figure>
                          </div>
                        )})
                      }
                    </div>
                  }
                  <div className="buttons is-right">
                    {!isInGroup(item.participants) &&
                      <button className="button is-danger" value={item._id} onClick={handleJoinEvent}><strong>Join</strong></button>
                    }
                    {isInGroup(item.participants) &&
                      <button className="button is-small" onClick={() => handleCancelEvent(item._id, participantId._id)}>Leave</button>
                    }
                  </div>
                </section>
          )
        })}
      </div>
    </section>
  )
}

export default GroupShowEvents 