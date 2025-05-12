import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  partitionAvatarGroupItems,
} from "@fluentui/react-components";


type User = {
  id:string,
  name: string,
  img: string
}

interface Props{
    type: string,
    size: string,
    users: User[]
}

export const AvatarGroupComponent = ({ type, size, users }: Props) => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({
    items: users.map(item => item.img || item.name || item.id )
  });

  return (
    <AvatarGroup layout={type} size={size} >
      {inlineItems.map((name) => (
        <AvatarGroupItem name={name} key={name} />
      ))}
      {overflowItems && (
        <AvatarGroupPopover>
          {overflowItems.map((name) => (
            <AvatarGroupItem name={name} key={name} />
          ))}
        </AvatarGroupPopover>
      )}
    </AvatarGroup>
  );
};