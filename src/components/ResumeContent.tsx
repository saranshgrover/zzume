import { GlobalSettings, ResumeData } from '@/lib/store'
import { CreativeSettings, MinimalSettings, ProfessionalSettings } from '@/lib/templateGenerator'
import { useTemplateStore } from '@/lib/templateStore'
import { parse, format, isValid } from 'date-fns'

interface ResumeContentProps {
  resumeData: ResumeData
  globalSettings: GlobalSettings
  isPDF?: boolean
}

export default function ResumeContent({ resumeData, globalSettings }: ResumeContentProps) {
  const { selectedTemplate, isHydrated } = useTemplateStore()
  
  // Don't render until template store is hydrated
  if (!isHydrated) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading template...</p>
        </div>
      </div>
    )
  }
  
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    if (dateString.toLowerCase() === 'present' || dateString.toLowerCase() === 'current' || dateString.toLowerCase() === 'now') {
      return 'Present'
    }
    // Try MM/YYYY
    let parsed
    parsed = parse(dateString, 'MM/yyyy', new Date())
    if (isValid(parsed) && dateString.match(/^\d{2}\/\d{4}$/)) {
      return format(parsed, 'MMM yyyy')
    }
    // Try MM/DD/YYYY
    parsed = parse(dateString, 'MM/dd/yyyy', new Date())
    if (isValid(parsed) && dateString.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      return format(parsed, 'MMM yyyy')
    }
    // Try YYYY-MM-DD
    parsed = parse(dateString, 'yyyy-MM-dd', new Date())
    if (isValid(parsed) && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return format(parsed, 'MMM yyyy')
    }
    // Try YYYY-MM
    parsed = parse(dateString, 'yyyy-MM', new Date())
    if (isValid(parsed) && dateString.match(/^\d{4}-\d{2}$/)) {
      return format(parsed, 'MMM yyyy')
    }
    // Try Month YYYY (e.g., January 2023)
    parsed = parse(dateString, 'MMMM yyyy', new Date())
    if (isValid(parsed)) {
      return format(parsed, 'MMM yyyy')
    }
    // Try abbreviated Month YYYY (e.g., Jan 2023)
    parsed = parse(dateString, 'MMM yyyy', new Date())
    if (isValid(parsed)) {
      return format(parsed, 'MMM yyyy')
    }
    // Try just year
    parsed = parse(dateString, 'yyyy', new Date())
    if (isValid(parsed) && dateString.match(/^\d{4}$/)) {
      return format(parsed, 'yyyy')
    }
    // fallback
    return dateString
  }

  // Template-specific rendering functions
  const renderProfessionalHeader = () => {
    const settings = globalSettings as ProfessionalSettings
    return (
      <section aria-label="Personal Information" className="text-center">
        <h1 
          className="font-bold" 
          style={{ 
            fontFamily: settings.typography.heading.fontFamily,
            fontSize: `${settings.typography.heading.fontSize}px`,
            color: settings.colors.primary,
            marginBottom: `${settings.spacing.header?.bottom}px`
          }}
        >
          {resumeData.personalInfo.name || 'Your Name'}
        </h1>
        {[resumeData.personalInfo.email, resumeData.personalInfo.phone, resumeData.personalInfo.location].some(Boolean) && (
          <div 
            style={{ 
              fontFamily: settings.typography.body.fontFamily,
              fontSize: `${settings.typography.body.fontSize}px`,
              color: settings.colors.secondary,
              marginBottom: `${settings.spacing.header?.bottom}px`
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
            style={{ 
              fontFamily: settings.typography.body.fontFamily,
              fontSize: `${settings.typography.body.fontSize}px`,
              color: settings.colors.secondary,
              marginBottom: `${settings.spacing.list.bottom}px`
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
              fontFamily: settings.typography.body.fontFamily,
              fontSize: `${settings.typography.body.fontSize}px`,
              color: settings.colors.primary,
              marginBottom: `${settings.spacing.list.bottom}px`
            }}
          >
            {resumeData.personalInfo.summary}
          </p>
        )}
      </section>
    )
  }

  const renderCreativeHeader = () => {
    const settings = globalSettings as CreativeSettings 
    return (
      <section aria-label="Personal Information" className="relative">
        {settings.layout?.backgroundPattern === 'dots' && (
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        )}
        <h1 
          className="font-bold" 
          style={{ 
            fontFamily: settings.typography.heading.fontFamily,
            fontSize: `${settings.typography.heading.fontSize}px`,
            color: settings.colors?.primary || '#000000',
            marginBottom: `${settings.spacing.header?.bottom}px`
          }}
        >
          {resumeData.personalInfo.name || 'Your Name'}
        </h1>
        {[resumeData.personalInfo.email, resumeData.personalInfo.phone, resumeData.personalInfo.location].some(Boolean) && (
          <div 
            style={{ 
              fontFamily: settings.typography.body.fontFamily,
              fontSize: `${settings.typography.body.fontSize}px`,
              color: settings.colors?.secondary || '#666666',
              marginBottom: `${settings.spacing.header?.bottom}px`
            }}
          >
            {[
              resumeData.personalInfo.email,
              resumeData.personalInfo.phone,
              resumeData.personalInfo.location
            ].filter(Boolean).join(' • ')}
          </div>
        )}
        {(resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio) && (
          <div 
            style={{ 
              fontFamily: settings.typography.body.fontFamily,
              fontSize: `${settings.typography.body.fontSize}px`,
              color: settings.colors?.accent || '#ff6b6b',
              marginBottom: `${settings.spacing.list.bottom}px`
            }}
          >
            {[
              resumeData.personalInfo.linkedin && `LinkedIn: ${resumeData.personalInfo.linkedin}`,
              resumeData.personalInfo.portfolio && `Portfolio: ${resumeData.personalInfo.portfolio}`
            ].filter(Boolean).join(' • ')}
          </div>
        )}
        {resumeData.personalInfo.summary && (
          <p 
            style={{ 
              fontFamily: settings.typography.body.fontFamily,
              fontSize: `${settings.typography.body.fontSize}px`,
              color: settings.colors?.primary || '#000000',
              marginBottom: `${settings.spacing.list.bottom}px`
            }}
          >
            {resumeData.personalInfo.summary}
          </p>
        )}
      </section>
    )
  }

  const renderMinimalHeader = () => {
    const settings = globalSettings as MinimalSettings
    return (
      <section aria-label="Personal Information">
        <h1 
          className="font-bold" 
          style={{ 
            fontFamily: settings.typography.heading.fontFamily,
            fontSize: `${settings.typography.heading.fontSize}px`,
            color: settings.colors?.primary || '#000000',
            marginBottom: `${settings.spacing.header?.bottom}px`
          }}
        >
          {resumeData.personalInfo.name || 'Your Name'}
        </h1>
        {[resumeData.personalInfo.email, resumeData.personalInfo.phone, resumeData.personalInfo.location].some(Boolean) && (
          <div 
            style={{ 
              fontFamily: settings.typography.body.fontFamily,
              fontSize: `${settings.typography.body.fontSize}px`,
              color: settings.colors?.secondary || '#333333',
              marginBottom: `${settings.spacing.header?.bottom}px`
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
            style={{ 
              fontFamily: settings.typography.body.fontFamily,
              fontSize: `${settings.typography.body.fontSize}px`,
              color: settings.colors?.secondary || '#333333',
              marginBottom: `${settings.spacing.list.bottom}px`
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
              fontFamily: settings.typography.body.fontFamily,
              fontSize: `${settings.typography.body.fontSize}px`,
              color: settings.colors?.primary || '#000000',
              marginBottom: `${settings.spacing.list.bottom}px`
            }}
          >
            {resumeData.personalInfo.summary}
          </p>
        )}
      </section>
    )
  }

  const renderSkills = () => {
    if (selectedTemplate === 'creative') {
      const settings = globalSettings as CreativeSettings
      if (settings.layout?.skillStyle === 'tags') {
        return (
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: settings.colors?.accent || '#ff6b6b',
                  color: 'white',
                  fontFamily: settings.typography.body.fontFamily,
                  fontSize: `${settings.typography.body.fontSize}px`
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        )
      }
    }
    
    // Default list style for all templates
    return (
      <p 
        style={{ 
          fontFamily: globalSettings.typography.body.fontFamily,
          fontSize: `${globalSettings.typography.body.fontSize}px`,
          marginBottom: `${globalSettings.spacing.list.bottom}px`
        }}
      >
        <strong>{resumeData.skills.join(', ')}</strong>
      </p>
    )
  }

  function renderSection(sectionId: string) {
    switch (sectionId) {
      case 'personal':
        switch (selectedTemplate) {
          case 'professional':
            return renderProfessionalHeader()
          case 'creative':
            return renderCreativeHeader()
          case 'minimal':
            return renderMinimalHeader()
          default:
            return renderMinimalHeader() // Fallback to minimal
        }
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
              {resumeData.sectionNames?.experience || 'Experience'}
            </h2>
            <ul style={{ marginBottom: `${globalSettings.spacing.list.bottom}px` }}>
              {resumeData.experience.map(exp => {
                return (
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
              )})}
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
              {resumeData.sectionNames?.education || 'Education'}
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
              {resumeData.sectionNames?.skills || 'Skills'}
            </h2>
            {renderSkills()}
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