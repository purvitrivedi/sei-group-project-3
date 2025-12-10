import React from "react";
import axios from "axios";
import Select from "react-select";
import { getToken } from "../../lib/auth";

class AddCompletedHike extends React.Component {
  state = {
    completedHikes: [],
    hikes: [],
    hikeOptions: [],
    selectedHike: "",
  };

  async componentDidMount() {
    try {
      const withHeaders = () => {
        return {
          headers: { Authorization: `Bearer ${getToken()}` },
        };
      };
      const res = await axios.get("/api/hikes");
      const resUser = await axios.get(
        `/api/profiles/${this.props.id}`,
        withHeaders()
      );
      this.setState(
        { hikes: res.data, completedHikes: resUser.data.completedHikes },
        () => {
          this.createHikeOptions();
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  createHikeOptions = () => {
    const { hikes } = this.state;
    const hikeOptions = hikes.map((hike) => ({
      value: hike._id,
      label: hike.name,
    }));
    // const comp = this.state.completedHikes.flatMap(item => item.hike._id)

    // for (let i = 0; i < comp.length; i++) {
    //   hikeOptions = hikeOptions.filter(hike => hike.value !== comp[i])
    // }

    this.setState({ hikeOptions });
  };

  handleMultiChange = async (selected) => {
    const selectedHike = selected ? { hike: selected.value } : "";
    this.setState({ selectedHike });
  };

  render() {
    return (
      <div>
        <form
          onSubmit={(event) =>
            this.props.handleSubmit(event, this.state.selectedHike)
          }
          className="columns comp-form"
        >
          <Select
            className="column is-four-fifths"
            placeholder="Add a new hike..."
            options={this.state.hikeOptions}
            onChange={this.handleMultiChange}
          />
          <div className="column">
            {" "}
            <button type="submit" className="button">
              +
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddCompletedHike;
