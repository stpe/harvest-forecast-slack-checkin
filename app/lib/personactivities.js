"use strict";

module.exports = (personActivity, projects, clients) => {
  return personActivity
    // ignore part day time off
    .filter(a => a.project_id !== parseInt(process.env.PROJECT_ID_TIME_OFF))
    // for each activity, get name
    .map(a => {
      let project = projects[a.project_id];

      if (project.client_id === parseInt(process.env.CLIENT_ID_INTERNAL)) {
        // if internal, use project name and make it lowercase
        return `_${project.name.toLowerCase()}_`;
      }

      // otherwise use client name
      return `_${clients[project.client_id].name}_`;
    });
};
