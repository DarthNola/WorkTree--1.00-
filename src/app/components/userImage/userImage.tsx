import React from 'react';
import * as crypto from 'crypto';

interface UserImageProps {
    emailAddress: string;
    defaultImage?: string;
}

function generateAvatarUrl(emailAddress: string, defaultImage: string = 'identicon') {
    const emailHash = crypto.createHash('md5').update(emailAddress).digest('hex');
    return `https://www.gravatar.com/avatar/${emailHash}?d=${defaultImage}`;
}

const UserImage: React.FC<UserImageProps> = ({ emailAddress, defaultImage }) => {
    const avatarUrl = generateAvatarUrl(emailAddress, defaultImage);

    return <img src={avatarUrl} alt="User Avatar" />;
};

export default UserImage;
