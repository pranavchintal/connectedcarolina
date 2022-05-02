import Navbar from "../components/Navbar";
import CCSwitch from "../components/CCSwitch";
import * as React from 'react';
import Footer from "../components/Footer";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState, useEffect } from 'react';
import db from '../firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'
import GroupCard from "../components/GroupCard";

export default function GroupFeed() {
  const [groups, setGroups] = useState()
  const [search, setSearch] = useState('')
  const [created, setCreated] = useState()
  const [joined, setJoined] = useState()
  const myName = 'Will'

  let groupcards = (groupSet) => (groupSet &&
    groupSet.sort((a, b) => b.created - a.created).map(group => (
      <GroupCard title={group.title}
        description={group.description}
        tags={group.tags}
        key={group.created}
        social={group.social}
        event={group.event} />
    )))

  useEffect(() => {
    async function getQuery() {
      let groupsList = []
      const query = await getDocs(collection(db, 'Groups'))

      query.forEach(doc => groupsList.push(doc.data()))
      setGroups(groupsList)
    }
    getQuery();
  }, [])

  useEffect(() => {
    if (groups) {
      setCreated(groups.filter(group => group.creator === myName))
      setJoined(groups.filter(group => group.members.includes(myName)))
    }
  }, [groups])

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
                  Created Groups ({created && `${created.length}`})&nbsp;&nbsp;
                  <span className="icon">
                    <i className="fas fa-chevron-up"></i>
                  </span>
                </p>
                {groupcards(created)}
                <p className="has-text-black has-text-weight-semibold is-size-5 pt-1 mt-5">
                  Joined Groups ({joined && `${joined.length}`})&nbsp;&nbsp;
                  <span className="icon">
                    <i className="fas fa-chevron-up"></i>
                  </span>
                </p>
                {groupcards(joined)}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}