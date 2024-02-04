import React, { useState, useEffect } from 'react';
import './ResumePage.css';
const ResumePage = () => {
  const [resumes, setResumes] = useState([]);
  const [currentResumeIndex, setCurrentResumeIndex] = useState(0);
  const [searchedJob, setSearchedJob] = useState('');
  const [filteredResumes, setFilteredResumes] = useState([]);

  useEffect(() => {
    
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setResumes(data.resume);
        setFilteredResumes(data.resume); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleNext = () => {
    if (currentResumeIndex < filteredResumes.length - 1) {
      setCurrentResumeIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentResumeIndex > 0) {
      setCurrentResumeIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSearch = () => {
   
    const lowercasedSearch = searchedJob.toLowerCase();

    
    const searchResults = resumes.filter((resume) =>
      resume.basics.AppliedFor.toLowerCase().includes(lowercasedSearch)
    );

    
    setFilteredResumes(searchResults);

   
    setCurrentResumeIndex(searchResults.length > 0 ? 0 : currentResumeIndex);
  };

  return (
    <><div className="search-bar">
          <label>
              <h2>Search by Job Opening:</h2>
          </label>
          <input
              type="text"
              placeholder="Search for keywords to filter resume"
              value={searchedJob}
              onChange={(e) => setSearchedJob(e.target.value)} />
          <button onClick={handleSearch}>Search</button>
      </div>
      <div className="resume-container">


              
                  {filteredResumes.length > 0 ? (
                    
                      <div>
                        <div className="PNbutton">
                        <button onClick={handlePrevious} disabled={currentResumeIndex === 0}>
                              Previous
                          </button>
                          <button
                              onClick={handleNext}
                              disabled={currentResumeIndex === filteredResumes.length - 1}
                          >
                              Next
                          </button>
                          </div>
                          <div className="resume-start">
                          
                          <h2>{filteredResumes[currentResumeIndex]?.basics?.name}</h2>
                              <h2>AppliedFor: {filteredResumes[currentResumeIndex]?.basics?.AppliedFor}</h2>
                             
                             </div>
                              <div className="resume-body"> 
                          <div className="resume-details">
                              <h3>Personal Information</h3>
                              <p>Phone: {filteredResumes[currentResumeIndex]?.basics?.phone}</p>
                              <p>Email: {filteredResumes[currentResumeIndex]?.basics?.email}</p>

                              {resumes[currentResumeIndex].basics.profiles && resumes[currentResumeIndex].basics.profiles.network === 'LinkedIn' && (
                                  <p>
                                      LinkedIn: <a href={resumes[currentResumeIndex].basics.profiles.url} target="_blank" rel="noopener noreferrer">
                                          {resumes[currentResumeIndex].basics.profiles.url}
                                      </a>
                                  </p>
                              )}
                              {resumes[currentResumeIndex].skills && (
                                  <div>
                                      <h3>Technical Skills</h3>

                                      <ul>
                                          {resumes[currentResumeIndex].skills.keywords.map((skill, index) => (
                                              <li key={index}>{skill}</li>
                                          ))}
                                      </ul>
                                  </div>
                              )}

                              {resumes[currentResumeIndex].interests && resumes[currentResumeIndex].interests.hobbies.length > 0 && (
                                  <div>
                                      <h3>Interests</h3>
                                      <ul>
                                          {resumes[currentResumeIndex].interests.hobbies.map((interest, index) => (
                                              <li key={index}>{interest}</li>
                                          ))}
                                      </ul>
                                  </div>
                              )}
                             
                          </div>

                          <div className="resume-section">
                             

                              {resumes[currentResumeIndex].work && (
                                  <div>
                                      <h2>Work Experience in previous company</h2>
                                      <p>
                                          <strong>Company Name:</strong> {resumes[currentResumeIndex].work['Company Name']}
                                      </p>
                                      <p>
                                          <strong>Position:</strong> {resumes[currentResumeIndex].work.Position}
                                      </p>
                                      <p>
                                          <strong>Start Date:</strong> {resumes[currentResumeIndex].work['Start Date']}
                                      </p>
                                      <p>
                                          <strong>End Date:</strong> {resumes[currentResumeIndex].work['End Date']}
                                      </p>
                                      <p>
                                          <strong>Summary:</strong> {resumes[currentResumeIndex].work.Summary}
                                      </p>
                                  </div>
                              )}
                              

                              {resumes[currentResumeIndex].projects && (
                                  <div>
                                      <h2>Projects</h2>
                                      <p>
                                          <strong>Name:</strong> {resumes[currentResumeIndex].projects.name}
                                      </p>
                                      <p>
                                          <strong>Description:</strong> {resumes[currentResumeIndex].projects.description}
                                      </p>
                                  </div>
                              )}
                              

                              {resumes[currentResumeIndex].education && (
                                  <div>
                                      <h2>Education</h2>
                                      <p>
                                          <strong>UG Institute:</strong> {resumes[currentResumeIndex].education.UG.institute}
                                      </p>
                                      <p>
                                          <strong>UG Course:</strong> {resumes[currentResumeIndex].education.UG.course}
                                      </p>
                                      <p>
                                          <strong>UG Start Date:</strong> {resumes[currentResumeIndex].education.UG['Start Date']}
                                      </p>
                                      <p>
                                          <strong>UG End Date:</strong> {resumes[currentResumeIndex].education.UG['End Date']}
                                      </p>
                                      <p>
                                          <strong>UG CGPA:</strong> {resumes[currentResumeIndex].education.UG.cgpa}
                                      </p>
                                      
                                      <p>
                                          <strong>Senior Secondary Institute:</strong>{' '}
                                          {resumes[currentResumeIndex].education['Senior Secondary'].institute}
                                      </p>
                                      <p>
                                          <strong>Senior Secondary CGPA:</strong> {resumes[currentResumeIndex].education['Senior Secondary'].cgpa}
                                      </p>
                                      
                                      <p>
                                          <strong>High School Institute:</strong> {resumes[currentResumeIndex].education['High School'].institute}
                                      </p>
                                      <p>
                                          <strong>High School CGPA:</strong> {resumes[currentResumeIndex].education['High School'].cgpa}
                                      </p>
                                  </div>
                              )}
                             

                              {resumes[currentResumeIndex].Internship && (
                                  <div>
                                      <h2>Internship</h2>
                                      <p><strong>Company Name:</strong> {resumes[currentResumeIndex].Internship['Company Name']}</p>
                                      <p><strong>Position:</strong> {resumes[currentResumeIndex].Internship.Position}</p>
                                      <p><strong>Start Date:</strong> {resumes[currentResumeIndex].Internship['Start Date']}</p>
                                      <p><strong>End Date:</strong> {resumes[currentResumeIndex].Internship['End Date']}</p>
                                      <p><strong>Summary:</strong> {resumes[currentResumeIndex].Internship.Summary}</p>
                                  </div>
                              )}

                              {resumes[currentResumeIndex].achievements && resumes[currentResumeIndex].achievements.Summary && (
                                  <div>
                                      <h2>Achievements</h2>
                                      <ul>
                                          {resumes[currentResumeIndex].achievements.Summary.map((achievement, index) => (
                                              <li key={index}>{achievement}</li>
                                          ))}
                                      </ul>
                                  </div>
                              )}

                          </div>

                          </div>   
                      </div>
                  ) : (
                      <p>Invalid search or No applications for this job</p>
                  )}
              
          </div></>
  );
};

export default ResumePage;
