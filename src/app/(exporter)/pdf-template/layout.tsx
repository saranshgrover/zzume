import '../../globals.css'

export default function PDFTemplateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title id="dynamic-title">Resume</title>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Import system fonts for better PDF rendering */
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap');
            
            /* Ensure fonts are available for PDF generation */
            * {
              font-family: 'Inter', 'Roboto', 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            }
            
            /* PDF-specific styles */
            body {
              margin: 0;
              padding: 0;
              font-family: 'Inter', 'Roboto', 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            /* Ensure proper font rendering in PDF */
            h1, h2, h3, h4, h5, h6 {
              font-family: 'Inter', 'Roboto', 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
              font-weight: 600;
            }
            
            p, div, span, li {
              font-family: 'Inter', 'Roboto', 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            }
          `
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Update title when resume data is available
            function updateTitle() {
              const windowAny = window;
              if (windowAny.resumeData && windowAny.resumeData.personalInfo && windowAny.resumeData.personalInfo.name) {
                document.title = windowAny.resumeData.personalInfo.name + ' Resume';
              }
            }
            
            // Check immediately and also set up a periodic check
            updateTitle();
            setInterval(updateTitle, 100);
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
} 