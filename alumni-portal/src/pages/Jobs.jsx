import { useState, useEffect } from "react";
import { Briefcase, MapPin, Building, Plus, X } from "lucide-react";

const Jobs = () => {

  const API_URL = import.meta.env.VITE_API_URL;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newJob, setNewJob] = useState({

    jobTitle: "",
    companyName: "",
    jobType: "Full-time",
    location: "",
    jobDescription: "",
    applyLink: ""

  });

  /* get jobs */

  useEffect(() => {

    fetch(`${API_URL}/api/jobs`)

      .then(res => res.json())

      .then(data => {

        setJobs(data);
        setLoading(false);

      });

  }, []);

  /* form change */

  const handleChange = (e) => {

    setNewJob({

      ...newJob,
      [e.target.name]: e.target.value

    });

  };

  /* post job */

  const handlePostJob = async (e) => {

    e.preventDefault();

    setIsSubmitting(true);

    try {

      const token = localStorage.getItem("alumniToken");

      const response = await fetch(`${API_URL}/api/jobs`, {

        method: "POST",

        headers: {

          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`

        },

        body: JSON.stringify(newJob)

      });

      const data = await response.json();

      if (!response.ok) {

        alert(data.error || "Failed to post job");
        return;

      }

      setJobs(prev => [data.job, ...prev]);

      setIsFormOpen(false);

      setNewJob({

        jobTitle: "",
        companyName: "",
        jobType: "Full-time",
        location: "",
        jobDescription: "",
        applyLink: ""

      });

    }

    catch (err) {

      console.error(err);
      alert("Server error");

    }

    finally {

      setIsSubmitting(false);

    }

  };

  /* check role */

  const user = JSON.parse(localStorage.getItem("alumniUser"));
  const isAlumni = user?.role === "alumni";

  return (

    <div className="container mx-auto p-10">

      <div className="flex justify-between mb-10">

        <h1 className="text-3xl font-bold">
          Jobs & Placements
        </h1>

        {isAlumni && (

          <button

            onClick={() => setIsFormOpen(true)}
            className="btn-primary flex gap-2"

          >

            <Plus size={18} />

            Post Job

          </button>

        )}

      </div>

      {loading ? (

        <p>Loading...</p>

      ) : (

        <div className="grid gap-5">

          {jobs.map(job => (

            <div key={job.id} className="card">

              <h2 className="font-bold">
                {job.jobTitle}
              </h2>

              <p>
                {job.companyName}
              </p>

              <p>
                {job.location}
              </p>

              <a href={job.applyLink} target="_blank">
                Apply
              </a>

            </div>

          ))}

        </div>

      )}

      {/* modal */}

      {isFormOpen && (

        <div className="modal">

          <form onSubmit={handlePostJob} className="modal-box">

            <input

              name="jobTitle"
              placeholder="Job title"
              required
              value={newJob.jobTitle}
              onChange={handleChange}

            />

            <input

              name="companyName"
              placeholder="Company"
              required
              value={newJob.companyName}
              onChange={handleChange}

            />

            <input

              name="location"
              placeholder="Location"
              required
              value={newJob.location}
              onChange={handleChange}

            />

            <input

              name="applyLink"
              placeholder="Apply link"
              required
              value={newJob.applyLink}
              onChange={handleChange}

            />

            <textarea

              name="jobDescription"
              placeholder="Description"
              required
              value={newJob.jobDescription}
              onChange={handleChange}

            />

            <button disabled={isSubmitting}>

              {isSubmitting ? "Posting..." : "Publish Job"}

            </button>

          </form>

        </div>

      )}

    </div>

  );

};

export default Jobs;
