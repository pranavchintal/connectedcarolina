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
	const [formats, setFormats] = useState(() => ['bold', 'italic']);
	const [groups, setGroups] = useState()
	const [social, setSocial] = useState(true)
	const [study, setStudy] = useState(true)
	const [isEvent, setIsEvent] = useState(false)
	const [days, setDays] = useState([])
	const [search, setSearch] = useState('')
	const [tags, setTags] = useState('')

	const handleFormat = (
		event: MouseEvent<HTMLElement>,
		newFormats: string[],
	) => {
		setFormats(newFormats);
	};

	let filterFunc = (list) => {
		let output = list
		if (social && !study) {
			output = list.filter(group => group.social)
		} else if (study && !social) {
			output = list.filter(group => !group.social)
		}

		let checker = (arr, target) => target.some(v => arr.includes(v));

		output = output && output.filter(group => group.event === isEvent &&
			group.title.toLowerCase().includes(search.toLowerCase()) &&
			group.tags.map(e => e.toLowerCase()).some(tag => tag.includes(tags)))

		// if card days contains all of the state days, show
		if (!isEvent && !days.length == 0) {
			output = output && output.filter(group => checker(group.days, days))
		}

		return output
	}

	let toggleDays = (value) => {
		if (days.includes(value)) {
			setDays(days.filter(day => day !== value))
		} else {
			setDays([...days, value])
		}
	}

	let toggleTags = (value) => {
		if (tags.includes(value)) {
			setTags(days.filter(tag => tag !== value))
		} else {
			setTags([...tags, value])
		}
	}

	let groupcards = (groups && filterFunc(groups).map(group => (
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

	return (
		<>
			<div className="group-feed">
				<Navbar />
				<section className="section p-6">
					<div className="container is-widescreen">
						<div className="columns is-variable is-8">
							<div className="column">
								<div className="box">
									<p className="has-text-weight-bold is-size-3 has-text-black pt-1 pb-3">
										Filters
									</p>
									<p className="has-text-black has-text-weight-semibold is-size-5 pt-1 pb-2">Types</p>
									<div className="py-1">
										<label className="checkbox has-text-weight-medium">
											<input type="checkbox" value={social} onChange={() => setSocial(!social)} defaultChecked />
											<span className="has-text-white">_</span>Social Groups
										</label>
									</div>
									<div className="py-1">
										<label className="checkbox has-text-weight-medium pr-4">
											<input type="checkbox" value={study} onChange={() => setStudy(!study)} defaultChecked />
											<span className="has-text-white">_</span>Study Groups
										</label>
									</div>
									<hr className="my-4" />
									<p className="has-text-black has-text-weight-semibold is-size-5 pt-1 pb-4">Tags</p>
									<div className="control has-icons-right pb-4">
										<input className="input has-text-black is-small" type="text" placeholder="Search for a tag" value={tags} onChange={e => setTags(e.target.value)} />
										<span className="icon is-small is-right">
											<i className="fas fa-search"></i>
										</span>
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
											<ToggleButton value="soccer" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Soccer
											</ToggleButton>
											<ToggleButton value="football" onClick={e => toggleTags(e.target.value)}>
												Football
											</ToggleButton>
											<ToggleButton value="baseball" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
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
											<ToggleButton value="basketball" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Basketball
											</ToggleButton>
											<ToggleButton value="hockey" onClick={e => toggleTags(e.target.value)}>
												Hockey
											</ToggleButton>
											<ToggleButton value="golf" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
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
											<ToggleButton value="other sports" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
												Other Sports
											</ToggleButton>
											<ToggleButton value="sports watching" sx={{ borderRadius: 9999 }} onClick={e => toggleTags(e.target.value)}>
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
									<hr className="my-3" />
									<p className="has-text-black has-text-weight-semibold is-size-5 pt-1 pb-4">Meeting Availability</p>
									<ToggleButtonGroup
										value={formats}
										onChange={handleFormat}
										aria-label="text formatting"
										color="primary"
										size="small"
										fullWidth
										sx={{
											borderRadius: '9999px',
										}}
									>
										<ToggleButton sx={{ borderRadius: 9999 }} value="sunday" onClick={e => toggleDays(e.target.value)}>
											S
										</ToggleButton>
										<ToggleButton value="monday" onClick={e => toggleDays(e.target.value)}>
											M
										</ToggleButton>
										<ToggleButton value="tuesday" onClick={e => toggleDays(e.target.value)}>
											T
										</ToggleButton>
										<ToggleButton value="wednesday" onClick={e => toggleDays(e.target.value)}>
											W
										</ToggleButton>
										<ToggleButton value="thursday" onClick={e => toggleDays(e.target.value)}>
											T
										</ToggleButton>
										<ToggleButton value="friday" onClick={e => toggleDays(e.target.value)}>
											F
										</ToggleButton>
										<ToggleButton sx={{ borderRadius: 9999 }} value="saturday" onClick={e => toggleDays(e.target.value)}>
											S
										</ToggleButton>
									</ToggleButtonGroup>
								</div>
							</div>
							<div className="column is-half">
								<div className="is-flex is-flex-direction-row is-justify-content-space-between">
									<span className="is-size-2 has-text-weight-bold has-text-black">Home</span>
									<div>
										<span className="mt-2">
											<span className="has-text-weight-bold">Recurring Groups</span>
											<CCSwitch onChange={() => setIsEvent(!isEvent)} />
											<span className="has-text-weight-medium">Event Groups</span>
										</span>
									</div>
								</div>
								<div className="field pt-4">
									<div className="control has-icons-right">
										<input className="input has-text-black" type="text" placeholder="Search for groups by name" value={search} onChange={e => setSearch(e.target.value)} />
										<span className="icon is-small is-right">
											<i className="fas fa-search"></i>
										</span>
									</div>
								</div>
								{groupcards}
							</div>
							<div className="column">

							</div>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</>
	);
}