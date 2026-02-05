 export function buildEmail(complaint, evidenceUrls) {

  return `
NEW GRIEVANCE RECEIVED

Category: ${complaint.category}
Role: ${complaint.role}

Name: ${complaint.personal.name}
Father Name: ${complaint.personal.fatherName}
Department: ${complaint.personal.department}

Programme: ${complaint.academic.programme}
Batch: ${complaint.academic.batch}
Semester: ${complaint.academic.semester}

Address: ${complaint.contact.address}
City: ${complaint.contact.city}
State: ${complaint.contact.state}
Pincode: ${complaint.contact.pincode}
Contact: ${complaint.contact.contactNumber}

Complaint:
${complaint.message}

Evidence URLs:
${evidenceUrls.length ? evidenceUrls.join("\n") : "None"}

---
Auto generated grievance system
`;
}
