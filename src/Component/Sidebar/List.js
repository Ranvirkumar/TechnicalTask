import * as React from 'react';
import { IconListCheck, IconArchive, IconFileText, IconHome, IconLockOpen, IconMail } from '@tabler/icons'


export const awards = {
    id: 'main-menu',
    type: 'group',
    children: [
        {
            id: 'dashboard-entry',
            title: 'Dashboard',
            type: 'item',
            url: '/Dashboard',
            icon: <IconHome />,
            breadcrumbs: false,
        },
        {
            id: 'submit-entry',
            title: 'Change password',
            type: 'item',
            url: '/ResetPassword',
            icon: <IconLockOpen />,
            breadcrumbs: false,
        },
        {
            id: 'entry-records',
            title: 'Change Email',
            type: 'item',
            url: '/ChangeEmail',
            icon: <IconMail />,
            breadcrumbs: false,
        }
    ],
}







