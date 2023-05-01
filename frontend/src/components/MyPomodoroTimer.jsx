import {Component} from 'react';
import '../styles/PomodoroTimerStyle.css'

class MyPomodoroTimer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workDuration: 25,
            breakDuration: 5,
            currentTime: 25 * 60,
            isRunning: false,
            isWorkPhase: true
        };

        this.handleStartTimer = this.handleStartTimer.bind(this);
        this.handleStopTimer = this.handleStopTimer.bind(this);
        this.tick = this.tick.bind(this);
    }

    handleStartTimer() {
        this.setState({
            isRunning: true
        });

        this.timerID = setInterval(this.tick, 1000);
    }

    handleStopTimer() {
        clearInterval(this.timerID);

        this.setState({
            isRunning: false,
            currentTime: this.state.workDuration * 60,
            isWorkPhase: true
        });
    }

    tick() {
        if (this.state.currentTime === 0) {
            if (this.state.isWorkPhase) {
                this.setState({
                    currentTime: this.state.breakDuration * 60,
                    isWorkPhase: false

                });
            } else {
                console.log("Work Time")
                this.setState({
                    currentTime: this.state.workDuration * 60,
                    isWorkPhase: true
                });
            }

            clearInterval(this.timerID);
            this.timerID = setInterval(this.tick, 1000);
        } else {
            this.setState({
                currentTime: this.state.currentTime - 1
            });
        }
    }

    render() {
        const {currentTime, isRunning, isWorkPhase} = this.state;

        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;

        return (
            <div className="PomodoroTimer">
                <div className="phase">
                    {isWorkPhase ? (<text className="workTime">Work Time</text>) : (
                        <text className="relaxTime">Relax Time</text>)
                    }
                </div>
                <div className="timer-display">
                    <text>{minutes}:{seconds < 10 ? '0' : ''}{seconds}</text>
                </div>

                <div className="timer-controls">
                    {isRunning ? (
                        <button className="btn btn-outline-danger" onClick={this.handleStopTimer}>⏯ Stop Timer</button>
                    ) : (
                        <button className="btn btn-outline-success" onClick={this.handleStartTimer}>⏯ Start Timer</button>
                    )}
                </div>
            </div>
        );
    }
}

export default MyPomodoroTimer;
