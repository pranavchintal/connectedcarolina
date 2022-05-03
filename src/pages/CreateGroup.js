import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from "react"
import db from '../firebase/firebase'
import { collection, doc, addDoc, Timestamp } from 'firebase/firestore'


export default function CreateGroup() {
    const [groupNameCount, setGroupNameCount] = useState(0);
    const [descCount, setDescCount] = useState(0);
    const [groupName, setGroupName] = useState("");
    //if not social, study
    const [isSocial, setIsSocial] = useState(true);
    const [description, setDescription] = useState("");
    const [days, setDays] = useState([])
    const [location, setLocation] = useState("");
    const [formats, setFormats] = useState(() => ['bold', 'italic']);
    const [tagSeach, setTagSearch] = useState("");
    const [groupCap, setGroupCap] = useState(12);
    const [isEvent, setIsEvent] = useState(false);
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [tags, setTags] = useState([]);

    let toggleTags = (value) => {
        if (tags.includes(value)) {
            setTags(tags.filter(tag => tag !== value))
        } else {
            setTags([...tags, value])
        }
    };

    const handleFormat = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: string[],
        ) => {
        setFormats(newFormats);
    };

    function formatTime_HH_mm(date) {
        return date.getHours();
    }

    async function handleSubmit(event) {

        event.preventDefault();

        if(groupCap > 12) {
            setGroupCap(12);
        } else if(groupCap > 2) {
            setGroupCap(2);
        }

        let date = new Date(eventDate);
        date.setHours(eventTime.substring(0,2));
        date.setMinutes(eventTime.substring(3,5));
        date.setDate(date.getDate() + 1);  



        const group = {
            cap : groupCap > groupCap,
            created : Timestamp.now(),
            creator : "David Hodgin",
            days : isEvent ? [] : days,
            description : description,
            date : isEvent ? Timestamp.fromDate(date) : Timestamp.now(),
            event : isEvent,
            social : isSocial,
            members : ["David Hodgin"],
            tags : tags,
            location : location == "" ? "n/a" : location,
            title : groupName
        }

        await addDoc(collection(db, "Groups"), group).catch((error) => console.log(error));

        window.location.href = '/';
    }

    function redirect() {
        window.location.href = '/';
    }

    let toggleDays = (value) => {
        if (days.includes(value)) {
            setDays(days.filter(day => day !== value))
        } else {
            setDays([...days, value])
        }
    }

    return (
        <div>
            <div className="group-feed">
                <Navbar />
                <section className="section p-6">
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                                <span className="is-size-2 has-text-weight-bold has-text-black">Create a group</span>
                                <div className="field is-grouped mt-3">
                                    <div className="control">
                                        <button type="submit" className="button is-primary has-text-weight-bold is-rounded mr-3">Finish Creating</button>
                                    </div>
                                    <div className="control">
                                        <button className="button is-danger has-text-weight-bold is-rounded" onClick={redirect}>Cancel</button>
                                    </div>
                                </div>
                            </div>

                            <div className="columns is-variable is-8 mt-6">
                                <div className="column is-one-third">
                                    <div className="field">
                                        <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                                            <label className="label has-text-black has-text-weight-semibold">Group Name</label>
                                            <span className="label has-text-weight-normal has-text-right mt-1" style={{ fontSize: "0.85rem" }}>{groupNameCount}/60</span>
                                        </div>
                                        <div className="control">
                                            <input className="input has-text-black" maxlength="60" value={groupName} type="text" onChange={e => {setGroupNameCount(e.target.value.length); setGroupName(e.target.value)}} />
                                        </div>
                                    </div>
                                    <div className="field mt-5">
                                        <label className="label has-text-black has-text-weight-semibold">Recurring/Event</label>
                                        <div className="">
                                            <label className="radio mb-2">
                                                <input className="mr-2" type="radio" name="recOrEv" value="rec" checked={!isEvent} onChange={() => setIsEvent(false)}/>
                                                Recurring Group
                                            </label>
                                        </div>
                                        <label className="radio">
                                            <input className="mr-2" type="radio" name="recOrEv" value="event" checked={isEvent} onChange={() => setIsEvent(true)}/>
                                            Event Group
                                        </label>
                                    </div>

                                    <div className="field mt-5">
                                        <label className="label has-text-black has-text-weight-semibold">Type</label>
                                        <div className="">
                                            <label className="radio mb-2">
                                                <input className="mr-2" type="radio" name="groupType" checked={isSocial} onChange={() => setIsSocial(true)}/>
                                                Social Group
                                            </label>
                                        </div>
                                        <label className="radio">
                                            <input className="mr-2" type="radio" name="groupType" checked={!isSocial} onChange={() => setIsSocial(false)} />
                                            Study Group
                                        </label>
                                    </div>
                                    <div className="field mt-5">
                                        <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                                            <label className="label has-text-black has-text-weight-semibold">Group Size</label>
                                            <span className="label has-text-weight-normal has-text-right mt-1" style={{ fontSize: "0.85rem" }}>Maximum: 12</span>
                                        </div>
                                        <div className="control">
                                            <input className="input has-text-black" type="number" max="12" min="2" onChange={e => setGroupCap(e.target.value)} />
                                        </div>
                                    </div>
                                    {isEvent ? <div className="field mt-5">
                                        <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                                            <label className="label has-text-black has-text-weight-semibold">Event Date</label>
                                        </div>
                                        <div className="control">
                                            <input className="input has-text-black" type="date" onChange={(event) => setEventDate(event.target.value)} />
                                        </div>
                                        <div className="field mt-5"></div>
                                        <div className="control">
                                            <input className="input has-text-black" type="time" onChange={(event) => setEventTime(event.target.value)} />
                                        </div>
                                    </div> : null}
                                    <div className="field mt-5">
                                        <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                                            <label className="label has-text-black has-text-weight-semibold">Description</label>
                                            <span className="label has-text-weight-normal has-text-right mt-1" style={{ fontSize: "0.85rem" }}>{descCount}/300</span>
                                        </div>
                                        <div className="control">
                                            <textarea className="textarea has-text-black" maxlength="300" value={description} placeholder="" onChange={e => {setDescCount(e.target.value.length); setDescription(e.target.value)}}></textarea>
                                        </div>
                                    </div>
                                    <hr />
                                    <p className="has-text-grey-darker">These fields are optional.</p>
                                    { isEvent ? <div></div> : (
                                    <div>
                                        <p className="has-text-black has-text-weight-semibold mt-4 mb-3 is-size-6">Meeting Availability</p>
                                        <ToggleButtonGroup
                                            value={formats}
                                            onChange={handleFormat}
                                            aria-label="text formatting"
                                            color="primary"
                                            size="small"
                                            fullWidth
                                        >
                                            <ToggleButton sx={{ borderRadius: 9999 }} value="sunday" onClick={e => toggleDays(e.target.value)}>
                                                S
                                            </ToggleButton>
                                            <ToggleButton value="monday"  onClick={e => toggleDays(e.target.value)}>
                                                M
                                            </ToggleButton>
                                            <ToggleButton value="tuesday"  onClick={e => toggleDays(e.target.value)}>
                                                T
                                            </ToggleButton>
                                            <ToggleButton value="wednesday"  onClick={e => toggleDays(e.target.value)}>
                                                W
                                            </ToggleButton>
                                            <ToggleButton value="thursday"  onClick={e => toggleDays(e.target.value)}>
                                                T
                                            </ToggleButton>
                                            <ToggleButton value="friday"  onClick={e => toggleDays(e.target.value)}>
                                                F
                                            </ToggleButton>
                                            <ToggleButton sx={{ borderRadius: 9999 }} value="saturday" onClick={e => toggleDays(e.target.value)}>
                                                S
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>)
                                    }
                                    <div className="field mt-5">
                                        <label className="label has-text-black has-text-weight-semibold">Location</label>
                                        <div className="control">
                                            <input className="input has-text-black" value={location} type="text" onChange={event => setLocation(event.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-one-third">
                                    <p className="has-text-black has-text-weight-semibold is-size-4 mb-3">Tags</p>
                                    <p className="has-text-grey-darker">Choose at least one tag to describe your group.</p>
                                    <div className="field mt-3">
                                        <div className="control has-icons-right">
                                            <input className="input has-text-black" type="text" placeholder="Search for tags" />
                                            <span className="icon is-small is-right">
                                                <i className="fas fa-search"></i>
                                            </span>
                                        </div>
                                    </div>
									<div className="has-text-black has-text-weight-medium mb-3">
										<span className="mr-1">Majors</span>
										<span className="icon">
											<i className="fas fa-chevron-up"></i>
										</span>
									</div>
									<div className="tags are-small are-rounded">
										<ToggleButtonGroup
											value={formats}
											onChange={handleFormat}
											aria-label="text formatting"
											type="checkbox"
											color="primary"
											size="small"
											fullWidth
											sx={{
												borderRadius: '9999px',
											}}
										>
											<ToggleButton value="comp" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												COMP
											</ToggleButton>
											<ToggleButton value="phys" onClick={e => toggleTags(e.target.value)}>
												PHYS
											</ToggleButton>
											<ToggleButton value="math" onClick={e => toggleTags(e.target.value)}>
												MATH
											</ToggleButton>
											<ToggleButton value="stor" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												STOR
											</ToggleButton>
										</ToggleButtonGroup>

										<ToggleButtonGroup
											value={formats}
											onChange={handleFormat}
											aria-label="text formatting"
											type="checkbox"
											color="primary"
											size="small"
											fullWidth
											sx={{
												borderRadius: '9999px',
											}}
										>
											<ToggleButton value="hist" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												HIST
											</ToggleButton>
											<ToggleButton value="engl" onClick={e => toggleTags(e.target.value)}>
												ENGL
											</ToggleButton>
											<ToggleButton value="arth" onClick={e => toggleTags(e.target.value)}>
												ARTH
											</ToggleButton>
											<ToggleButton value="pwad" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												PWAD
											</ToggleButton>
										</ToggleButtonGroup>

										<ToggleButtonGroup
											value={formats}
											onChange={handleFormat}
											aria-label="text formatting"
											type="checkbox"
											color="primary"
											size="small"
											fullWidth
											sx={{
												borderRadius: '9999px',
											}}
										>
											<ToggleButton value="busi" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												BUSI
											</ToggleButton>
											<ToggleButton value="anth" onClick={e => toggleTags(e.target.value)}>
												ANTH
											</ToggleButton>
											<ToggleButton value="biol" onClick={e => toggleTags(e.target.value)}>
												BIOL
											</ToggleButton>
											<ToggleButton value="chem" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												CHEM
											</ToggleButton>
										</ToggleButtonGroup>

										<ToggleButtonGroup
											value={formats}
											onChange={handleFormat}
											aria-label="text formatting"
											type="checkbox"
											color="primary"
											size="small"
											fullWidth
											sx={{
												borderRadius: '9999px',
											}}
										>
											<ToggleButton value="econ" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												ECON
											</ToggleButton>
											<ToggleButton value="othermajors" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Other Majors
											</ToggleButton>
										</ToggleButtonGroup>
									</div>
									<div className="has-text-black has-text-weight-medium mb-3">
										<span className="mr-1">Sports</span>
										<span className="icon">
											<i className="fas fa-chevron-up"></i>
										</span>
									</div>
									<div className="tags are-small are-rounded">
										  <ToggleButtonGroup
										    value={formats}
										    onChange={handleFormat}
										    aria-label="text formatting"
										    type="checkbox"
										    color="primary"
										    size="small"
										    fullWidth
										    sx={{
										      borderRadius: '9999px',
										    }}
										  >
										    <ToggleButton value="basketball" onClick={e => toggleTags(e.target.value)}>
										      Basketball
										    </ToggleButton>
										    <ToggleButton value="football" onClick={e => toggleTags(e.target.value)}>
										      Football
										    </ToggleButton>
										    <ToggleButton value="golf" onClick={e => toggleTags(e.target.value)}>
										      Golf
										    </ToggleButton>
										  </ToggleButtonGroup>

										  <ToggleButtonGroup
										    value={formats}
										    onChange={handleFormat}
										    aria-label="text formatting"
										    type="checkbox"
										    color="primary"
										    size="small"
										    fullWidth
										    sx={{
										      borderRadius: '9999px',
										    }}
										  >
										    <ToggleButton value="soccer" onClick={e => toggleTags(e.target.value)}>
										      Soccer
										    </ToggleButton>
										    <ToggleButton value="hockey" onClick={e => toggleTags(e.target.value)}>
										      Hockey
										    </ToggleButton>
										    <ToggleButton value="baseball" onClick={e => toggleTags(e.target.value)}>
										      Baseball
										    </ToggleButton>
										  </ToggleButtonGroup>

										  <ToggleButtonGroup
										    value={formats}
										    onChange={handleFormat}
										    aria-label="text formatting"
										    type="checkbox"
										    color="primary"
										    size="small"
										    fullWidth
										    sx={{
										      borderRadius: '9999px',
										    }}
										  >
										    <ToggleButton value="other sports" onClick={e => toggleTags(e.target.value)}>
										      Other Sports
										    </ToggleButton>
										    <ToggleButton value="sports watching" onClick={e => toggleTags(e.target.value)}>
										      Sports Watching
										    </ToggleButton>
										  </ToggleButtonGroup>
                 							 </div>
									<div className="has-text-black has-text-weight-medium mb-3">
										<span className="mr-1">Interests</span>
										<span className="icon">
											<i className="fas fa-chevron-up"></i>
										</span>
									</div>
									<div className="tags are-small are-rounded">
										<ToggleButtonGroup
											value={formats}
											onChange={handleFormat}
											aria-label="text formatting"
											type="checkbox"
											color="primary"
											size="small"
											fullWidth
											sx={{
												borderRadius: '9999px',
											}}
										>
											<ToggleButton value="art" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Art
											</ToggleButton>
											<ToggleButton value="video games" onClick={e => toggleTags(e.target.value)}>
												Video Games
											</ToggleButton>
											<ToggleButton value="board games" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Board Games
											</ToggleButton>
										</ToggleButtonGroup>

										<ToggleButtonGroup
											value={formats}
											onChange={handleFormat}
											aria-label="text formatting"
											type="checkbox"
											color="primary"
											size="small"
											fullWidth
											sx={{
												borderRadius: '9999px',
											}}
										>
											<ToggleButton value="hiking" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Hiking
											</ToggleButton>
											<ToggleButton value="movies" onClick={e => toggleTags(e.target.value)}>
												Movies
											</ToggleButton>
											<ToggleButton value="politics" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Politics
											</ToggleButton>
										</ToggleButtonGroup>

										<ToggleButtonGroup
											value={formats}
											onChange={handleFormat}
											aria-label="text formatting"
											type="checkbox"
											color="primary"
											size="small"
											fullWidth
											sx={{
												borderRadius: '9999px',
											}}
										>
											<ToggleButton value="debate" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Debate
											</ToggleButton>
											<ToggleButton value="publicspeaking" onClick={e => toggleTags(e.target.value)}>
												Public Speaking
											</ToggleButton>
											<ToggleButton value="dancing" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Dancing
											</ToggleButton>
										</ToggleButtonGroup>

										<ToggleButtonGroup
											value={formats}
											onChange={handleFormat}
											aria-label="text formatting"
											type="checkbox"
											color="primary"
											size="small"
											fullWidth
											sx={{
												borderRadius: '9999px',
											}}
										>
											<ToggleButton value="singing" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Singing
											</ToggleButton>
											<ToggleButton value="theatre" onClick={e => toggleTags(e.target.value)}>
												Theatre
											</ToggleButton>
											<ToggleButton value="volunteering" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Volunteering
											</ToggleButton>
										</ToggleButtonGroup>

										<ToggleButtonGroup
											value={formats}
											onChange={handleFormat}
											aria-label="text formatting"
											type="checkbox"
											color="primary"
											size="small"
											fullWidth
											sx={{
												borderRadius: '9999px',
											}}
										>
											<ToggleButton value="networking" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Networking
											</ToggleButton>
											<ToggleButton value="otherinterests" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Other Interests
											</ToggleButton>
										</ToggleButtonGroup>
									</div>
									<div className="has-text-black has-text-weight-medium mb-3">
										<span className="mr-1">Music</span>
										<span className="icon">
											<i className="fas fa-chevron-up"></i>
										</span>
									</div>
									<div className="tags are-small are-rounded">
										<ToggleButtonGroup
											value={formats}
											onChange={handleFormat}
											aria-label="text formatting"
											type="checkbox"
											color="primary"
											size="small"
											fullWidth
											sx={{
												borderRadius: '9999px',
											}}
										>
											<ToggleButton value="classical" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Classical
											</ToggleButton>
											<ToggleButton value="hiphop" onClick={e => toggleTags(e.target.value)}>
												Hip Hop
											</ToggleButton>
											<ToggleButton value="pop" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Pop
											</ToggleButton>
										</ToggleButtonGroup>

										<ToggleButtonGroup
											value={formats}
											onChange={handleFormat}
											aria-label="text formatting"
											type="checkbox"
											color="primary"
											size="small"
											fullWidth
											sx={{
												borderRadius: '9999px',
											}}
										>
											<ToggleButton value="electronic" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Electronic
											</ToggleButton>
											<ToggleButton value="indie" onClick={e => toggleTags(e.target.value)}>
												Indie
											</ToggleButton>
											<ToggleButton value="country" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Country
											</ToggleButton>
										</ToggleButtonGroup>

										<ToggleButtonGroup
											value={formats}
											onChange={handleFormat}
											aria-label="text formatting"
											type="checkbox"
											color="primary"
											size="small"
											fullWidth
											sx={{
												borderRadius: '9999px',
											}}
										>
											<ToggleButton value="jazz" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Jazz
											</ToggleButton>
											<ToggleButton value="rock" onClick={e => toggleTags(e.target.value)}>
												Rock
											</ToggleButton>
											<ToggleButton value="othergenres" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Other Genres
											</ToggleButton>
										</ToggleButtonGroup>
									</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}
