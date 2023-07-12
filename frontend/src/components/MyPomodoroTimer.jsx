import {Component} from 'react';
import '../styles/PomodoroTimerStyle.css'
import sound from '../sounds/TimerPhase.mp3'

class MyPomodoroTimer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workDuration: 25,
            breakDuration: 5,
            currentTime: 25 * 60,
            isRunning: false,
            isWorkPhase: true,
            isPopupOpen: false,
            isCustomized: false
        };

        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.handleStartTimer = this.handleStartTimer.bind(this);
        this.handleStopTimer = this.handleStopTimer.bind(this);
        this.tick = this.tick.bind(this);
        this.handleCustomizeTimer = this.handleCustomizeTimer.bind(this);
        this.handleRevertToClassic = this.handleRevertToClassic.bind(this);
    }

    openPopup() {
        this.setState({
            isPopupOpen: true,
            newWorkDuration: this.state.workDuration,
            newBreakDuration: this.state.breakDuration
        });
    }

    closePopup() {
        this.setState({isPopupOpen: false});
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

    play() {
        new Audio(sound).play();
    }

    tick() {
        if (this.state.currentTime === 0) {
            this.play();
            if (this.state.isWorkPhase) {
                this.setState({
                    currentTime: this.state.breakDuration * 60,
                    isWorkPhase: false
                });
            } else {
                console.log("Work Time");
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

    handleCustomizeTimer() {
        const {newWorkDuration, newBreakDuration} = this.state;

        // Validate the input values
        if (!isNaN(newWorkDuration) && !isNaN(newBreakDuration)) {
            clearInterval(this.timerID);

            this.setState({
                workDuration: newWorkDuration,
                breakDuration: newBreakDuration,
                currentTime: newWorkDuration * 60,
                isWorkPhase: true,
                isCustomized: true,
                isRunning: false,
                isPopupOpen: false
            });
        } else {
            console.log("Invalid input. Please enter numeric values.");
        }
    }

    handleRevertToClassic() {
        clearInterval(this.timerID);

        this.setState({
            workDuration: 25,
            breakDuration: 5,
            currentTime: 25 * 60,
            isWorkPhase: true,
            isCustomized: false,
            isRunning: false
        });
    }


    render() {
        const {currentTime, isRunning, isWorkPhase, isCustomized, isPopupOpen} = this.state;

        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;

        return (
            <div className="PomodoroTimer">
                <div className="phase">
                    {isWorkPhase ? (
                        <text className="workTime">Work Time</text>
                    ) : (
                        <text className="relaxTime">Relax Time</text>
                    )}
                </div>
                <div className="timer-display">
                    <text>
                        {minutes}:{seconds < 10 ? "0" : ""}
                        {seconds}
                    </text>
                </div>

                <div className="timer-controls">
                    {isRunning ? (
                        <button className="btn btn-outline-danger" onClick={this.handleStopTimer}>
                            ⏯ Stop Timer
                        </button>
                    ) : (
                        <button className="btn btn-outline-success" onClick={this.handleStartTimer}>
                            ⏯ Start Timer
                        </button>
                    )}
                </div>


                <div className="customizedTimer">
                    {isCustomized ? (
                        <button className="btn btn-outline-primary" onClick={this.handleRevertToClassic}>
                            Revert to Classic
                        </button>
                    ) : (
                        <button className="btn btn-outline-primary" onClick={this.openPopup}>Customize Timer</button>
                    )}
                </div>

                <div className="timerPopup">
                    {isPopupOpen && (
                        <div>
                            <div>
                                <text className="newWorkDuration">Enter the new Work Duration (in minutes): </text>
                                <input
                                    style={{width: 50, textAlign: "center", marginTop: 20}}
                                    className="customizedWork"
                                    type="number"
                                    value={this.state.newWorkDuration}
                                    onChange={(e) =>
                                        this.setState({newWorkDuration: parseInt(e.target.value, 10)})
                                    }
                                />
                            </div>
                            <div>
                                <text className="newBrakDuration">Enter the new Break Duration (in minutes): </text>
                                <input
                                    style={{width: 50, textAlign: "center", marginTop: 20, marginBottom: 20}}
                                    className="customizedBreak"
                                    type="number"
                                    value={this.state.newBreakDuration}
                                    onChange={(e) =>
                                        this.setState({newBreakDuration: parseInt(e.target.value, 10)})
                                    }
                                />
                            </div>
                            <div>
                                <button className="btn btn-outline-danger"
                                        onClick={this.closePopup}
                                        style={{marginRight: 5}}>
                                    Cancel
                                </button>
                                <button className="btn btn-outline-success"
                                        onClick={this.handleCustomizeTimer}
                                        style={{marginLeft: 5}}>
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default MyPomodoroTimer;
