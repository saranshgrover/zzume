import * as React from "react"
import { cn } from "@/lib/utils"

interface DateInputProps extends Omit<React.ComponentProps<"input">, "onChange"> {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

// Smart date parser that handles various input formats
function parseDateInput(input: string): { isValid: boolean; formattedDate: string; error?: string } {
  if (!input.trim()) {
    return { isValid: true, formattedDate: '' }
  }

  const cleanInput = input.trim().toLowerCase()
  
  // Handle common formats
  const patterns = [
    // MM/YYYY or MM-YYYY
    /^(\d{1,2})[\/\-](\d{4})$/,
    // MM/DD/YYYY or MM-DD-YYYY
    /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/,
    // Month YYYY (e.g., "January 2023", "Jan 2023")
    /^(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(\d{4})$/i,
    // YYYY-MM or YYYY-MM-DD
    /^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/,
    // Just year
    /^(\d{4})$/,
    // Current/Present
    /^(present|current|now)$/i,
  ]

  const monthNames = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ]
  const monthAbbr = [
    'jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
  ]

  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i]
    const match = cleanInput.match(pattern)
    if (match) {
      if (i === 5) { // Current/Present pattern
        return { isValid: true, formattedDate: 'Present' }
      }
      
      if (i === 4 && match.length === 2) { // Just year pattern
        const year = parseInt(match[1])
        if (year >= 1900 && year <= new Date().getFullYear() + 10) {
          return { isValid: true, formattedDate: year.toString() }
        }
      }
      
      if (i === 2 && match.length === 3) { // Month YYYY format
        const monthStr = match[1].toLowerCase()
        const year = parseInt(match[2])
        
        let monthIndex = monthNames.indexOf(monthStr)
        if (monthIndex === -1) {
          monthIndex = monthAbbr.indexOf(monthStr)
        }
        
        if (monthIndex !== -1 && year >= 1900 && year <= new Date().getFullYear() + 10) {
          const month = monthIndex + 1
          return { 
            isValid: true, 
            formattedDate: `${month.toString().padStart(2, '0')}/${year}` 
          }
        }
      }
      
      if (i === 3 && match.length >= 3) { // YYYY-MM or YYYY-MM-DD format
        const year = parseInt(match[1])
        const month = parseInt(match[2])
        const day = match[3] ? parseInt(match[3]) : null
        
        if (year >= 1900 && year <= new Date().getFullYear() + 10 && 
            month >= 1 && month <= 12) {
          if (day && (day < 1 || day > 31)) {
            return { isValid: false, formattedDate: '', error: 'Invalid day' }
          }
          const formattedMonth = month.toString().padStart(2, '0')
          return { 
            isValid: true, 
            formattedDate: day ? `${year}-${formattedMonth}-${day.toString().padStart(2, '0')}` : `${formattedMonth}/${year}` 
          }
        }
      }
      
      if (i === 0 && match.length === 3) { // MM/YYYY or MM-YYYY format
        const month = parseInt(match[1])
        const year = parseInt(match[2])
        
        if (month >= 1 && month <= 12 && year >= 1900 && year <= new Date().getFullYear() + 10) {
          const formattedMonth = month.toString().padStart(2, '0')
          return { isValid: true, formattedDate: `${formattedMonth}/${year}` }
        }
      }
      
      if (i === 3 && match.length >= 3) { // YYYY-MM or YYYY-MM-DD format
        const year = parseInt(match[1])
        const month = parseInt(match[2])
        const day = match[3] ? parseInt(match[3]) : null
        
        if (year >= 1900 && year <= new Date().getFullYear() + 10 && 
            month >= 1 && month <= 12) {
          if (day && (day < 1 || day > 31)) {
            return { isValid: false, formattedDate: '', error: 'Invalid day' }
          }
          const formattedMonth = month.toString().padStart(2, '0')
          return { 
            isValid: true, 
            formattedDate: day ? `${year}-${formattedMonth}-${day.toString().padStart(2, '0')}` : `${formattedMonth}/${year}` 
          }
        }
      }
      
      if (i === 1 && match.length === 4) { // MM/DD/YYYY or MM-DD-YYYY format
        const month = parseInt(match[1])
        const day = parseInt(match[2])
        const year = parseInt(match[3])
        
        if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && 
            year >= 1900 && year <= new Date().getFullYear() + 10) {
          const formattedMonth = month.toString().padStart(2, '0')
          const formattedDay = day.toString().padStart(2, '0')
          return { 
            isValid: true, 
            formattedDate: `${formattedMonth}/${formattedDay}/${year}` 
          }
        }
      }
    }
  }
  
  return { 
    isValid: false, 
    formattedDate: '', 
    error: 'Please enter a valid date (e.g., "01/2023", "January 2023", "2023")' 
  }
}

export function DateInput({ value, onChange, placeholder = "MM/YYYY", className, ...props }: DateInputProps) {
  const [error, setError] = React.useState<string>()
  const [isFocused, setIsFocused] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const result = parseDateInput(inputValue)
    
    if (result.isValid) {
      setError(undefined)
      onChange(result.formattedDate)
    } else {
      setError(result.error)
      // Still allow typing even if invalid
      onChange(inputValue)
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (value && !error) {
      // Format the date on blur if it's valid
      const result = parseDateInput(value)
      if (result.isValid && result.formattedDate !== value) {
        onChange(result.formattedDate)
      }
    }
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          error && "border-destructive",
          className
        )}
        {...props}
      />
      {error && isFocused && (
        <div className="absolute top-full left-0 mt-1 text-xs text-destructive bg-destructive/10 px-2 py-1 rounded border border-destructive/20 max-w-xs z-10">
          {error}
        </div>
      )}
    </div>
  )
} 