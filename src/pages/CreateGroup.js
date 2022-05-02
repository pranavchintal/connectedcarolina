import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from "react"

export default function CreateGroup() {
  const [groupNameCount, setGroupNameCount] = useState(0);
  const [descCount, setDescCount] = useState(0);

  const [formats, setFormats] = useState(() => ['bold', 'italic']);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats);
  };

  return (
    <div>
      <div className="group-feed">
        <Navbar />
        <section className="section p-6">
          <div className="container">
            <form>
              <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                <span className="is-size-2 has-text-weight-bold has-text-black">Create a group</span>
                <div className="field is-grouped mt-3">
                  <div className="control">
                    <button className="button is-primary has-text-weight-bold is-rounded mr-3">Finish Creating</button>
                  </div>
                  <div className="control">
                    <button className="button is-danger has-text-weight-bold is-rounded">Cancel</button>
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
                      <input className="input has-text-black" type="text" onChange={e => setGroupNameCount(e.target.value.length)} />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <label className="label has-text-black has-text-weight-semibold">Type</label>
                    <div className="">
                      <label className="radio mb-2">
                        <input className="mr-2" type="radio" name="type" />
                        Social Group
                      </label>
                    </div>
                    <label className="radio">
                      <input className="mr-2" type="radio" name="type" />
                      Study Group
                    </label>
                  </div>
                  <div className="field mt-5">
                    <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                      <label className="label has-text-black has-text-weight-semibold">Description</label>
                      <span className="label has-text-weight-normal has-text-right mt-1" style={{ fontSize: "0.85rem" }}>{descCount}/300</span>
                    </div>
                    <div className="control">
                      <textarea className="textarea has-text-black" placeholder="" onChange={e => setDescCount(e.target.value.length)}></textarea>
                    </div>
                  </div>
                  <hr />
                  <p className="has-text-grey-darker">These two fields are optional.</p>
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
                      <ToggleButton sx={{ borderRadius: 9999 }} value="sunday">
                        S
                      </ToggleButton>
                      <ToggleButton value="monday">
                        M
                      </ToggleButton>
                      <ToggleButton value="tuesday">
                        T
                      </ToggleButton>
                      <ToggleButton value="wednesday">
                        W
                      </ToggleButton>
                      <ToggleButton value="thursday">
                        T
                      </ToggleButton>
                      <ToggleButton value="friday">
                        F
                      </ToggleButton>
                      <ToggleButton sx={{ borderRadius: 9999 }} value="saturday">
                        S
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                  <div className="field mt-5">
                    <label className="label has-text-black has-text-weight-semibold">Location</label>
                    <div className="control">
                      <input className="input has-text-black" type="text" />
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
                    <span className="mr-1 has-text-weight-semibold">Majors</span>
                    <span className="icon">
                      <i className="fas fa-chevron-down"></i>
                    </span>
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