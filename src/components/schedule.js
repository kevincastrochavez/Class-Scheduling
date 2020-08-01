import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeCourse } from '../actions';

class Schedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            enrolled: []
        }

        this.renderCourse = this.renderCourse.bind(this);
    }

    renderCourse(course) {
        return (
            <div key={this.state.enrolled.indexOf(course)} className={`slot ${course.enrolled ? 'slot__course' : 'slot__empty'}`}>
                <div>
                    {course.enrolled ? course.title : 'Empty Slot'}
                </div>

                <a className={`action slot__remove `} onClick={() => this.props.removeCourse(course)}> Remove Course</a>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        var newEnrolled = [];

        this.state.enrolled.map((course) => {
            if (course.enrolled) {
                newEnrolled.push(course)
            }
        })

        nextProps.courses.map((course) => {
            if (course.enrolled && !newEnrolled.includes(course)) {
                newEnrolled.push(course)
            }
        })

        for (var emptySlot = newEnrolled.length; emptySlot < 5; emptySlot++) {
            newEnrolled.push({ enrolled: false })
        }

        this.setState({
            enrolled: newEnrolled
        })
    }
    
    render() {
        return (
            <div>
                <div className="schedule__slots">
                {
                    this.state.enrolled.map(this.renderCourse)
                }
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    var enrolledCourses = [];
    state.courses.map((course) => {
        if (course.enrolled) {
            enrolledCourses.push(course)
        }
    })
    return { courses: enrolledCourses };
}

function mapDispatchToProps(dispatch) {
    return {
        removeCourse: (course) => {
            dispatch(removeCourse(course))
        }
    }

}

Schedule = connect(mapStateToProps, mapDispatchToProps)(Schedule);

export default Schedule;