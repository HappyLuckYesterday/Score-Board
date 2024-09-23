package tool

import (
	"github.com/montanaflynn/stats"
)

func Mean(data []float64) float64 {
	mean, _ := stats.Mean(data)
	return mean
}

func Median(data []float64) float64 {
	median, _ := stats.Median(data)
	return median
}

func StdDevSample(data []float64) float64 {
	stddev, _ := stats.StandardDeviationSample(data)
	return stddev
}

func PercentileQ1(data []float64) float64 {
	q1, _ := stats.Percentile(data, 25)
	return q1
}

func PercentileQ3(data []float64) float64 {
	q3, _ := stats.Percentile(data, 75)
	return q3
}

func Min(data []float64) float64 {
	min, _ := stats.Min(data)
	return min
}

func Max(data []float64) float64 {
	max, _ := stats.Max(data)
	return max
}

func Avg(data []float64) float64 {
	avg, _ := stats.Mean(data)
	return avg
}

// OutliersPercentage returns the outliers in the data
func OutliersPercentage(data []float64) float64 {

	// Get the mean and standard deviation
	mean, _ := stats.Mean(data)
	stddev, _ := stats.StandardDeviationSample(data)

	// Get the outliers
	outliers := 0
	for _, value := range data {
		if value > mean+2*stddev || value < mean-2*stddev {
			outliers++
		}
	}

	// Return the percentage of outliers
	return float64(outliers) / float64(len(data)) * 100

}
