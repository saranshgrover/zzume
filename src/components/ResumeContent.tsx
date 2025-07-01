import { GlobalSettings, ResumeData } from '@/lib/store'

interface ResumeContentProps {
  resumeData: ResumeData
  globalSettings: GlobalSettings
  isPDF?: boolean
}

export default function ResumeContent({ resumeData, globalSettings }: ResumeContentProps) {
  // Helper function to format dates consistently
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
  }

  function renderSection(sectionId: string) {
    switch (sectionId) {
      case 'personal':
        return (
          <section aria-label="Personal Information">
            <h1 
              className="font-bold" 
              style={{ 
                fontFamily: globalSettings.typography.heading.fontFamily,
                fontSize: `${globalSettings.typography.heading.fontSize}px`,
                marginBottom: `${globalSettings.spacing.header?.bottom}px`
              }}
            >
              {resumeData.personalInfo.name || 'Your Name'}
            </h1>
            {[resumeData.personalInfo.email, resumeData.personalInfo.phone, resumeData.personalInfo.location].some(Boolean) && (
              <div 
                className="text-gray-600" 
                style={{ 
                  fontFamily: globalSettings.typography.body.fontFamily,
                  fontSize: `${globalSettings.typography.body.fontSize}px`,
                  marginBottom: `${globalSettings.spacing.header?.bottom}px`
                }}
              >
                {[
                  resumeData.personalInfo.email,
                  resumeData.personalInfo.phone,
                  resumeData.personalInfo.location
                ].filter(Boolean).join(' | ')}
              </div>
            )}
            {(resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio) && (
              <div 
                className="text-gray-600" 
                style={{ 
                  fontFamily: globalSettings.typography.body.fontFamily,
                  fontSize: `${globalSettings.typography.body.fontSize}px`,
                  marginBottom: `${globalSettings.spacing.list.bottom}px`
                }}
              >
                {[
                  resumeData.personalInfo.linkedin && `LinkedIn: ${resumeData.personalInfo.linkedin}`,
                  resumeData.personalInfo.portfolio && `Portfolio: ${resumeData.personalInfo.portfolio}`
                ].filter(Boolean).join(' | ')}
              </div>
            )}
            {resumeData.personalInfo.summary && (
              <p 
                style={{ 
                  fontFamily: globalSettings.typography.body.fontFamily,
                  fontSize: `${globalSettings.typography.body.fontSize}px`,
                  marginBottom: `${globalSettings.spacing.list.bottom}px`
                }}
              >
                {resumeData.personalInfo.summary}
              </p>
            )}
          </section>
        )
      case 'experience':
        return (
          <section aria-label="Work Experience">
            <h2 
              style={{ 
                fontFamily: globalSettings.typography.sectionHeading.fontFamily,
                fontSize: `${globalSettings.typography.sectionHeading.fontSize}px`,
                marginTop: `${globalSettings.spacing.sectionHeading.top}px`,
                marginBottom: `${globalSettings.spacing.sectionHeading.bottom}px`,
                fontWeight: 600
              }}
            >
              Professional Experience
            </h2>
            <ul style={{ marginBottom: `${globalSettings.spacing.list.bottom}px` }}>
              {resumeData.experience.map(exp => (
                <li key={exp.id} style={{ marginBottom: `${globalSettings.spacing.listItem.bottom}px` }}>
                  <article>
                    <header style={{ marginBottom: `${globalSettings.spacing.header?.bottom}px` }}>
                      <h3 
                        className="font-semibold" 
                        style={{ 
                          fontFamily: globalSettings.typography.subheading.fontFamily,
                          fontSize: `${globalSettings.typography.subheading.fontSize}px`
                        }}
                      >
                        {exp.position}
                      </h3>
                      <div 
                        className="font-medium text-gray-700" 
                        style={{ 
                          fontFamily: globalSettings.typography.body.fontFamily,
                          fontSize: `${globalSettings.typography.body.fontSize}px`
                        }}
                      >
                        {exp.company}
                      </div>
                      <div 
                        className="text-gray-500" 
                        style={{ 
                          fontFamily: globalSettings.typography.body.fontFamily,
                          fontSize: `${globalSettings.typography.body.fontSize - 2}px`
                        }}
                      >
                        {exp.location} | {formatDate(exp.startDate)} - {exp.endDate === 'Present' ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </header>
                    {exp.description.length > 0 && (
                      <ul className="list-disc ml-5" style={{ 
                        fontFamily: globalSettings.typography.body.fontFamily,
                        fontSize: `${globalSettings.typography.body.fontSize}px`
                      }}>
                        {exp.description.map((d, i) => (
                          <li key={i} style={{ marginBottom: `${globalSettings.spacing.descriptionList.spacing}px` }}>
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </li>
              ))}
            </ul>
          </section>
        )
      case 'education':
        return (
          <section aria-label="Education">
            <h2 
              style={{ 
                fontFamily: globalSettings.typography.sectionHeading.fontFamily,
                fontSize: `${globalSettings.typography.sectionHeading.fontSize}px`,
                marginTop: `${globalSettings.spacing.sectionHeading.top}px`,
                marginBottom: `${globalSettings.spacing.sectionHeading.bottom}px`,
                fontWeight: 600
              }}
            >
              Education
            </h2>
            <ul style={{ marginBottom: `${globalSettings.spacing.list.bottom}px` }}>
              {resumeData.education.map(edu => (
                <li key={edu.id} style={{ marginBottom: `${globalSettings.spacing.listItem.bottom}px` }}>
                  <article>
                    <header style={{ marginBottom: `${globalSettings.spacing.header?.bottom}px` }}>
                      <h3 
                        className="font-semibold" 
                        style={{ 
                          fontFamily: globalSettings.typography.subheading.fontFamily,
                          fontSize: `${globalSettings.typography.subheading.fontSize}px`
                        }}
                      >
                        {edu.degree} in {edu.field}
                      </h3>
                      <div 
                        className="font-medium text-gray-700" 
                        style={{ 
                          fontFamily: globalSettings.typography.body.fontFamily,
                          fontSize: `${globalSettings.typography.body.fontSize}px`
                        }}
                      >
                        {edu.institution}
                      </div>
                      <div 
                        className="text-gray-500" 
                        style={{ 
                          fontFamily: globalSettings.typography.body.fontFamily,
                          fontSize: `${globalSettings.typography.body.fontSize - 2}px`
                        }}
                      >
                        {formatDate(edu.startDate)} - {edu.endDate === 'Present' ? 'Present' : formatDate(edu.endDate)}
                        {edu.gpa && ` | GPA: ${edu.gpa}`}
                      </div>
                      {edu.honors && (
                        <div 
                          className="text-gray-600 italic" 
                          style={{ 
                            fontFamily: globalSettings.typography.body.fontFamily,
                            fontSize: `${globalSettings.typography.body.fontSize - 1}px`
                          }}
                        >
                          {edu.honors}
                        </div>
                      )}
                    </header>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        )
      case 'skills':
        return (
          <section aria-label="Skills">
            <h2 
              style={{ 
                fontFamily: globalSettings.typography.sectionHeading.fontFamily,
                fontSize: `${globalSettings.typography.sectionHeading.fontSize}px`,
                marginTop: `${globalSettings.spacing.sectionHeading.top}px`,
                marginBottom: `${globalSettings.spacing.sectionHeading.bottom}px`,
                fontWeight: 600
              }}
            >
              Technical Skills
            </h2>
            <p 
              style={{ 
                fontFamily: globalSettings.typography.body.fontFamily,
                fontSize: `${globalSettings.typography.body.fontSize}px`,
                marginBottom: `${globalSettings.spacing.list.bottom}px`
              }}
            >
              <strong>{resumeData.skills.join(', ')}</strong>
            </p>
          </section>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full h-full" style={{ 
      padding: `${globalSettings.margin.top}px ${globalSettings.margin.right}px ${globalSettings.margin.bottom}px ${globalSettings.margin.left}px` 
    }}>
      {resumeData.sectionOrder.map((sectionId, index) => (
        <div key={sectionId}>
          {renderSection(sectionId)}
          {index < resumeData.sectionOrder.length - 1 && sectionId !== 'skills' && (
            <hr className="border-gray-300" />
          )}
        </div>
      ))}
    </div>
  )
} 