import React from 'react'

const HelpIcon = ({ selected }) => {
    return (
        <>
            <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="_ionicons_svg_md-help">
                    <path id="Vector"
                        d="M13.5469 19H10.4531V15.9531H13.5469V19ZM13.5 14.4062H10.5C10.5 9.67188 15 9.94844 15 6.95312C15 5.30312 13.65 3.98125 12 3.98125C10.35 3.98125 9 5.40625 9 7H6C6 3.67188 8.68594 1 12 1C15.3141 1 18 3.64375 18 6.95312C18 10.6984 13.5 11.125 13.5 14.4062Z"
                        fill={`${selected ? '#2F80ED' : '#8E8E93'}`} />
                </g>
            </svg>
        </>
    )
}

export default HelpIcon