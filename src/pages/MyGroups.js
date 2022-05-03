import Navbar from "../components/Navbar";
import * as React from 'react';
import Footer from "../components/Footer";
import { useState, useEffect } from 'react';
import db from '../firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'
import GroupCard from "../components/GroupCard";

export default function MyGroups() {
  const [groups, setGroups] = useState()
  const [search, setSearch] = useState('')
  const [created, setCreated] = useState()
  const [joined, setJoined] = useState()
  const [colTitle, setColTitle] = useState()
  const [colDescription, setColDescription] = useState()
  const [colTags, setColTags] = useState()
  const [colCreator, setColCreator] = useState()
  const [colLocation, setColLocation] = useState()
  const [colDate, setColDate] = useState()
  const [colDays, setColDays] = useState()
  const [colCap, setColCap] = useState()
  const [colSocial, setColSocial] = useState()
  const [colEvent, setColEvent] = useState()
  const [colMembers, setColMembers] = useState()
  const myName = 'Will'

  let groupcards = (groupSet) => (groupSet &&
    groupSet.sort((a, b) => b.created - a.created).map((group, index) => (
      <GroupCard title={group.title}
        description={group.description}
        tags={group.tags}
        key={group.created}
        social={group.social}
        event={group.event}
        creator={group.creator}
        created={group.created}
        date={group.date}
        days={group.days}
        cap={group.cap}
        location={group.location}
        members={group.members}
        setColMembers={setColMembers}
        setColTitle={setColTitle}
        setColDescription={setColDescription}
        setColTags={setColTags}
        setColCreator={setColCreator}
        setColLocation={setColLocation}
        setColDate={setColDate}
        setColDays={setColDays}
        setColCap={setColCap}
        setColSocial={setColSocial}
        setColEvent={setColEvent}
        index={index}
        amCreator={(group.creator === myName)} />
    )))

  useEffect(() => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    async function getQuery() {
      let groupsList = []
      await delay(250)

      const query = await getDocs(collection(db, 'Groups'))

      query.forEach(doc => groupsList.push(doc.data()))
      setGroups(groupsList)
    }

    getQuery();
  }, [])

  useEffect(() => {
    if (groups) {
      setCreated(groups.filter(group => group.creator === myName))
      setJoined(groups.filter(group => group.members.includes(myName) && group.creator !== myName))
    }
  }, [groups])

  let toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1)
    })
  }

  let colTagsRender = (colTags && colTags.map(tag => (
    <span className="tag is-rounded has-text-weight-semibold has-text-dark"
      key={tag}>
      {toTitleCase(tag)}
    </span>
  )))

  return (
    <>
      <div className="group-feed">
        <Navbar />
        <section className="section p-6">
          <div className="container is-widescreen">
            <div className="columns is-variable is-8 is-centered">
              <div className="column is-half">
                <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                  <span className="is-size-2 has-text-weight-bold has-text-black">My Groups</span>
                </div>
                <div className="field pt-4">
                  <div className="control has-icons-right">
                    <input className="input has-text-black" type="text" placeholder="Search for groups by name" value={search} onChange={e => setSearch(e.target.value)} />
                    <span className="icon is-small is-right">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                </div>
                <p className="has-text-black has-text-weight-semibold is-size-5 pt-1 mt-5">
                  Created Groups ({(created && `${created.length}`) || 0})&nbsp;&nbsp;
                  <span className="icon">
                    <i className="fas fa-chevron-up"></i>
                  </span>
                </p>
                {groupcards(created)}
                <p className="has-text-black has-text-weight-semibold is-size-5 pt-1 mt-5">
                  Joined Groups ({(joined && `${joined.length}`) || 0})&nbsp;&nbsp;
                  <span className="icon">
                    <i className="fas fa-chevron-up"></i>
                  </span>
                </p>
                {groupcards(joined)}
              </div>

              <div className="column mt-6 pt-6">
                <p className="has-text-black has-text-weight-semibold is-size-4 mt-6 pt-6">
                  {colTitle || 'Sample title'}
                </p>
                <div className="tags mt-2 mb-2">
                  {colEvent &&
                    <span className="tag is-rounded has-text-weight-semibold has-text-white is-event">
                      {colSocial ? 'Social Event' : 'Study Event'}
                    </span>
                  }
                  {!colEvent &&
                    <span className="tag is-rounded has-text-weight-semibold has-text-white is-success">
                      {colSocial ? 'Social Group' : 'Study Group'}
                    </span>

                  }
                  {colTagsRender}
                </div>
                <div className="media mb-4">
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img src={require("../assets/profile_pic.png")} alt="face" />
                    </p>
                  </figure>
                  <p className="media-content has-text-black is-size-6 mt-4 ml-2">Created by {`${colCreator || 'Anonymous'}`}</p>
                </div>
                <p className="has-text-black has-text-weight-semibold is-size-6">
                  {`${colEvent ? 'Event' : 'Group'} Info`}
                </p>
                <p className='has-text-black mb-4'>
                  {colDescription || 'Description'}
                </p>
                {colLocation &&
                  <p className='mb-2'>
                    {colLocation}
                  </p>
                }
                {colEvent && colDate &&
                  <p className='mb-2'>
                    {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(colDate.seconds * 1000) || 'Date'}
                  </p>
                }
                {!colEvent && colDays &&
                  <p className='mb-2'>
                    {(colDays && `Meets ${colDays.map(day => ' ' + toTitleCase(day))}`) || 'Days'}
                  </p>
                }
                {colCap &&
                  <p className='mb-2'>
                    {`${colMembers.length}/${colCap} slots filled`}
                  </p>
                }
                {colMembers && (myName == colCreator) &&
                  <>
                    <p className="has-text-black has-text-weight-semibold is-size-6 mt-3 mb-3">
                      Members
                    </p>
                    {colMembers.map(member => (
                      <div className="media mb-4" key={member}>
                        <figure className="media-left">
                          <p className="image is-64x64">
                            <img src={require("../assets/profile_pic.png")} alt="face" />
                          </p>
                        </figure>
                        <p className="media-content has-text-black is-size-6 mt-4 ml-2">{`${member || 'Anonymous'} ${(member === colCreator) ? '(Creator)' : ''}`}</p>
                      </div>

                    ))}
                  </>}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}