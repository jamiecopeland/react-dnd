import React from 'react'
import PropTypes from 'prop-types'
import {
	DragSource,
	DragSourceConnector,
	DragSourceMonitor,
	ConnectDragSource,
} from 'react-dnd'

const style: React.CSSProperties = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	cursor: 'move',
	float: 'left',
}

const boxSource = {
	beginDrag(props: BoxProps) {
		return {
			name: props.name,
		}
	},

	isDragging(props: BoxProps, monitor: DragSourceMonitor) {
		const item = monitor.getItem()
		return props.name === item.name
	},
}

export interface BoxProps {
	name: string
	type: string
	isDropped?: boolean
	isDragging?: boolean
	connectDragSource?: ConnectDragSource
}

@DragSource(
	(props: BoxProps) => props.type,
	boxSource,
	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)
export default class Box extends React.Component<BoxProps> {
	public static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		isDropped: PropTypes.bool.isRequired,
	}
	public render() {
		const { name, isDropped, isDragging, connectDragSource } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragSource(
			<div style={{ ...style, opacity }}>
				{isDropped ? <s>{name}</s> : name}
			</div>,
		)
	}
}
