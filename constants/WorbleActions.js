export const WorbleActions = [
    {
        id: 'feed', text: 'FEED', action: {
            type: 'OVERLAY_MENU',
            title: 'Feed',
            data: [
                { id: 'blueberry', text: 'Blueberry' },
                { id: 'marshamallow', text: 'Marshmallow' }
            ]
        }
    },
    { id: 'bathe', text: 'BATHE' }
];