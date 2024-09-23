package tool

import (
	"fmt"
	"time"
)

func NextDay(dateStr string) string {
	// Parse the date string
	layout := "2006-01-02" // Layout for parsing
	date, err := time.Parse(layout, dateStr)
	if err != nil {
		fmt.Println("Error parsing date:", err)
		return dateStr
	}

	// Add one day
	nextDay := date.AddDate(0, 0, 1)

	// Format the next day back to string
	nextDayStr := nextDay.Format(layout)
	return nextDayStr
}
