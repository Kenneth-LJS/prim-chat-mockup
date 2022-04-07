import React, {
    ChangeEventHandler,
    Fragment,
    FunctionComponent,
    KeyboardEventHandler,
    MouseEventHandler,
    MutableRefObject,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import SiteHead from '../common/site-head';
import TextAreaAutosize from 'react-textarea-autosize';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { useStateCallback } from '../../utils/react-hooks';
import emojiRegex from 'emoji-regex';

import styles from './view.module.scss';

const CHAT_BUBBLE_TRANSITION_SECONDS = parseFloat(
    styles.chatBubbleTransitionSeconds
);

type User = 'self' | 'other';

type UserInput = UserInputText;

type UserInputText = {
    type: 'text';
    content: string;
};

type ChatBubbleData =
    | TextChatBubbleData
    | InlineOptionChatBubbleData
    | OptionChatBubbleData;

type TextChatBubbleData = {
    type: 'text';
    user: User;
    content: string;
    imageSrc?: string;
};

type InlineOptionChatBubbleData = {
    type: 'inline-option';
    user: 'other';
    content: string;
    options: string[][];
    imageSrc?: string;
};

type OptionChatBubbleData = {
    type: 'option';
    user: 'other';
    content: string;
    prompt: string;
    options: string[];
    imageSrc?: string;
};

const IndexPage: FunctionComponent = () => {
    const [chatHistory, updateChatHistory] = useStateCallback(
        [] as ChatBubbleData[]
    );
    function addChatHistory(chatBubbleData: ChatBubbleData) {
        updateChatHistory((chatHistory: ChatBubbleData[]) => [
            ...chatHistory,
            chatBubbleData,
        ]);
    }

    useEffect(() => {
        setTimeout(() => {
            addChatHistory({
                type: 'inline-option',
                user: 'other',
                imageSrc: '/chat-banners/job-notification-banner.png',
                content:
                    'Could you tell us a bit about your preferences and skills?',
                options: [['Later', 'Start']],
            });
        }, 1000);
        // updateChatHistory(
        //     () => [
        //         {
        //             type: 'text',
        //             user: 'self',
        //             content: 'Hello world',
        //         },
        //         {
        //             type: 'text',
        //             user: 'other',
        //             content: 'Hello world',
        //         },
        //         {
        //             type: 'text',
        //             user: 'self',
        //             content:
        //                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at mi at nisi varius pretium. Praesent quis risus vehicula, euismod massa vel, ornare odio. Vestibulum in iaculis ante. Cras posuere nunc sit amet erat dignissim porttitor a ac nisi. Pellentesque feugiat aliquam tempor. Duis nibh nulla, convallis quis aliquam vitae, vulputate in risus. Morbi vitae feugiat dui. Phasellus porttitor scelerisque sapien sagittis efficitur. Proin auctor enim vitae justo pulvinar congue. Nulla vehicula posuere suscipit. Sed commodo eleifend suscipit. Suspendisse potenti. Duis faucibus, felis sit amet ullamcorper pretium, ex massa tincidunt arcu, in tempor lorem metus id nisi. Donec enim tellus, interdum vel metus vitae, dictum feugiat odio.',
        //         },
        //         {
        //             type: 'text',
        //             user: 'other',
        //             content:
        //                 'Pellentesque feugiat est libero, vitae porttitor lacus convallis nec. Integer in porta lacus. Pellentesque non lorem vitae elit pharetra rutrum vitae nec ex. Etiam condimentum, tellus eget interdum facilisis, est libero facilisis odio, ut vestibulum nulla erat nec velit. Aliquam ut lectus nec arcu mollis posuere. Pellentesque facilisis mi sit amet ipsum malesuada auctor. Quisque vestibulum sapien ac ligula dictum, in accumsan turpis tristique. Quisque malesuada sapien quis massa convallis, a luctus mauris posuere. Nulla elementum lacus risus, sit amet malesuada mauris sodales ut. Quisque quis leo quis erat iaculis ultricies. Praesent dictum magna orci, fermentum hendrerit risus lobortis nec.',
        //         },
        //         {
        //             type: 'inline-option',
        //             user: 'other',
        //             imageSrc: '/chat-banners/job-notification-banner.png',
        //             content:
        //                 'Could you tell us a bit about your preferences and skills?',
        //             options: [['Later', 'Start']],
        //         },
        //         {
        //             type: 'inline-option',
        //             user: 'other',
        //             content: 'What is your ideal job type?',
        //             options: [
        //                 ['Full-time', 'Part-time'],
        //                 ['Contract', 'Temporary'],
        //                 ['Internship', 'Commission'],
        //                 ['Skip for now'],
        //             ],
        //         },
        //         {
        //             type: 'text',
        //             user: 'other',
        //             content:
        //                 'What is your desired job?\n\nℹ Tips: Type occupation title (eg: Nurse)',
        //         },
        //         {
        //             type: 'option',
        //             user: 'other',
        //             content:
        //                 'What is your desired job?\n\nℹ Tips: Type occupation title (eg: Nurse)',

        //             prompt: 'Select answer',
        //             options: [
        //                 'No experience',
        //                 'Less than 1 year',
        //                 '3 years',
        //                 '7 years',
        //                 'More than 10 years',
        //             ],
        //         },
        //     ],
        //     () => scrollChatToBottomRef.current()
        // );
    }, []);

    const progressRef = useRef(0);
    const stateRef = useRef({} as any);
    function handleUserInput(input: UserInput) {
        if (input.type === 'text') {
            const progress = progressRef.current;
            const content = input.content;
            addChatHistory({
                type: 'text',
                content: content,
                user: 'self',
            });

            const timeoutDelay = 700;
            if (progress === 0) {
                setTimeout(() => {
                    addChatHistory({
                        type: 'text',
                        user: 'other',
                        content:
                            'Where do you want to work?\n\nℹ️ Tips: Type location name (e.g. Austin)',
                    });
                }, timeoutDelay);
            } else if (progress === 1) {
                setTimeout(() => {
                    addChatHistory({
                        type: 'inline-option',
                        user: 'other',
                        content: 'What is your ideal job type?',
                        options: [
                            ['Full-time', 'Part-time'],
                            ['Contract', 'Temporary'],
                            ['Internship', 'Commission'],
                            ['Skip for now'],
                        ],
                    });
                }, timeoutDelay);
            } else if (progress === 2) {
                setTimeout(() => {
                    addChatHistory({
                        type: 'text',
                        user: 'other',
                        content:
                            'What is your desired job?\n\nℹ Tips: Type occupation title (eg: Nurse)',
                    });
                }, timeoutDelay);
            } else if (progress === 3) {
                setTimeout(() => {
                    addChatHistory({
                        type: 'option',
                        user: 'other',
                        content:
                            'How many years of experience do you have in this area?',
                        prompt: 'Select answer',
                        options: [
                            'No experience',
                            'Less than 1 year',
                            '3 years',
                            '7 years',
                            'More than 10 years',
                        ],
                    });
                }, timeoutDelay);
            } else if (progress === 4) {
                setTimeout(() => {
                    addChatHistory({
                        type: 'text',
                        user: 'other',
                        content:
                            'Great news! Here are some jobs straight away which we think may be a good fit for you 😀✨',
                    });
                }, timeoutDelay);
                setTimeout(() => {
                    addChatHistory({
                        type: 'inline-option',
                        user: 'other',
                        imageSrc: '/chat-banners/software-engineer-banner.jpg',
                        content:
                            '💼 Software Engineer\n📍 Amsterdam\n🗒️ Full-time, 3years experience, C++,  Ruby, Python',
                        options: [['Show more jobs']],
                    });
                }, timeoutDelay * 3);
                setTimeout(() => {
                    addChatHistory({
                        type: 'inline-option',
                        user: 'other',
                        content:
                            '✔️ Alert activated\n\n💼 Software Engineer\n📍 Amsterdam\n🗒️ Full-time, 3years experience, C++,  Ruby, Python',
                        options: [['Manage notifications']],
                    });
                }, timeoutDelay * 3);
            }

            progressRef.current += 1;
        }
    }

    const scrollChatToBottomRef = useRef<() => void>(() => undefined);

    return (
        <Fragment>
            <style global jsx>{`
                body {
                    background-color: #f6f6f6;

                    background-image: url(/images/chat-background.png);
                    background-position: center;
                    background-size: cover;

                    overscroll-behavior: none;

                    font-family: 'Roboto', sans-serif;
                    font-size: 16px;
                }
            `}</style>
            <SiteHead title={'View Prototype'} />
            <div className={styles.layout}>
                <StickyBar />
                <ChatHistory
                    chatHistory={chatHistory}
                    scrollChatToBottomRef={scrollChatToBottomRef}
                    onUserInput={handleUserInput}
                />
                <ChatInput
                    onUserInput={handleUserInput}
                    scrollChatToBottom={scrollChatToBottomRef.current}
                />
            </div>
        </Fragment>
    );
};

const StickyBar: FunctionComponent = () => {
    return (
        <div className={styles.stickyBar}>
            <img
                src="/images/chevron-left.png"
                className={styles.stickyBarChevron}
            />
            <div className={styles.stickyBarUser}>
                <img
                    src="/images/indeed-logo.png"
                    className={styles.stickyBarUserIcon}
                />
                <span className={styles.stickyBarUserName}>Indeed</span>
            </div>
            <img
                src="/images/video-icon.png"
                className={styles.stickyBarVideoIcon}
            />
            <img
                src="/images/call-icon.png"
                className={styles.stickyBarCallIcon}
            />
        </div>
    );
};

type ChatHistoryProps = {
    chatHistory: ChatBubbleData[];
    scrollChatToBottomRef?: MutableRefObject<() => void>;
    onUserInput?: (input: UserInput) => void;
};

const ChatHistory: FunctionComponent<ChatHistoryProps> = (props) => {
    const { chatHistory, scrollChatToBottomRef, onUserInput } = props;

    const maxScrollY = useRef(-1);
    const chatContainerRef = useRef(undefined as HTMLDivElement | undefined);
    useEffect(() => {
        scrollToBottom();
    }, [chatHistory.length]);

    function scrollToBottom(smooth = true) {
        const chatContainerElem = chatContainerRef.current;
        if (typeof chatContainerElem === 'undefined') {
            return;
        }
        if (chatContainerElem.scrollTop === maxScrollY.current) {
            chatContainerElem.scrollTo({
                top:
                    chatContainerElem.scrollHeight -
                    chatContainerElem.offsetHeight,
                behavior: smooth ? 'smooth' : 'auto',
            });
        }

        maxScrollY.current =
            chatContainerElem.scrollHeight - chatContainerElem.offsetHeight;
    }
    scrollChatToBottomRef.current = scrollToBottom;

    return (
        <div className={styles.chatContainer} ref={chatContainerRef}>
            <div className={styles.chat}>
                {chatHistory.map((chatBubbleData, i) => (
                    <ChatBubble
                        key={i}
                        data={chatBubbleData}
                        onUserInput={onUserInput}
                    />
                ))}
            </div>
        </div>
    );
};

type ChatInputProps = {
    onUserInput: (input: UserInput) => void;
    scrollChatToBottom: () => void;
};

const ChatInput: FunctionComponent<ChatInputProps> = (props) => {
    const { onUserInput, scrollChatToBottom } = props;
    const [textInput, setTextInput] = useState('');

    function sendMessage() {
        if (textInput.trim().length > 0) {
            onUserInput({
                type: 'text',
                content: textInput.trim(),
            });
            setTextInput('');
        }
        return;
    }

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setTextInput(event.currentTarget.value);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
        event
    ) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            sendMessage();
            return;
        }
    };

    const handleClickSend: MouseEventHandler<HTMLImageElement> = () => {
        sendMessage();
    };

    return (
        <div className={styles.chatInput}>
            <img
                src="/images/plus-icon.png"
                className={styles.chatInputPlusIcon}
            />
            <div className={styles.chatInputBoxContainer}>
                <img
                    src="/images/sticker-icon.png"
                    className={styles.chatInputStickerIcon}
                />
                <TextAreaAutosize
                    className={styles.chatInputBox}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={textInput}
                    onHeightChange={() => scrollChatToBottom}
                />
            </div>
            <ChatInputRightButtons
                isTyping={textInput.length > 0}
                onClickSend={handleClickSend}
            />
        </div>
    );
};

type ChatInputRightButtonsProps = {
    isTyping?: boolean;
    onClickSend?: MouseEventHandler<HTMLImageElement>;
};

const ChatInputRightButtons: FunctionComponent<ChatInputRightButtonsProps> = (
    props
) => {
    const { isTyping, onClickSend } = props;
    const className = classNames(
        styles.chatInputRightButtons,
        isTyping && styles.typing
    );
    return (
        <div className={className}>
            <div
                className={classNames(
                    styles.chatInputRightButtonsNotTyping,
                    isTyping && styles.hidden
                )}>
                <img
                    src="/images/camera-icon.png"
                    className={styles.chatInputCameraIcon}
                />
                <img
                    src="/images/microphone-icon.png"
                    className={styles.chatInputMicrophoneIcon}
                />
            </div>
            <div
                className={classNames(
                    styles.chatInputRightButtonsTyping,
                    !isTyping && styles.hidden
                )}>
                <img
                    src="/images/send-message-icon.png"
                    className={styles.chatInputSendMessageIcon}
                    onClick={onClickSend}
                />
            </div>
        </div>
    );
};

type ChatBubbleProps = {
    data: ChatBubbleData;
    onUserInput: (input: UserInput) => void;
};

const ChatBubble: FunctionComponent<ChatBubbleProps> = (props) => {
    const bubbleType = props.data.type;
    if (bubbleType === 'text') {
        return <TextChatBubble {...(props as TextChatBubbleProps)} />;
    } else if (bubbleType === 'inline-option') {
        return (
            <InlineOptionChatBubble
                {...(props as InlineOptionChatBubbleProps)}
            />
        );
    } else if (bubbleType === 'option') {
        return <OptionChatBubble {...(props as OptionChatBubbleProps)} />;
    }

    // @ts-expect-error
    throw Error(`Unknown ChatBubble type: "${data.type}"`);
};

type TextChatBubbleProps = {
    data: TextChatBubbleData;
    onUserInput: (input: UserInput) => void;
};

const TextChatBubble: FunctionComponent<TextChatBubbleProps> = (props) => {
    const { user, content, imageSrc = undefined } = props.data;
    const containerClassName = classNames(
        styles.chatBubbleContainer,
        user === 'self' && styles.self,
        user === 'other' && styles.other
    );
    const bubbleClassName = classNames(
        styles.chatBubble,
        user === 'self' && styles.self,
        user === 'other' && styles.other
    );

    const contentElem = textToElement(content);

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={CHAT_BUBBLE_TRANSITION_SECONDS * 1000}
            classNames={{
                appear: styles.appearStart,
                appearActive: styles.appearActive,
                appearDone: styles.appearDone,
            }}>
            <div className={containerClassName}>
                <div className={bubbleClassName}>
                    {imageSrc && (
                        <img
                            src={imageSrc}
                            className={styles.chatBubbleImage}
                        />
                    )}
                    {contentElem}
                    <ChatBubbleArrow user={user} />
                </div>
            </div>
        </CSSTransition>
    );
};

type InlineOptionChatBubbleProps = {
    data: InlineOptionChatBubbleData;
    onUserInput: (input: UserInput) => void;
};

const InlineOptionChatBubble: FunctionComponent<InlineOptionChatBubbleProps> = (
    props
) => {
    const { data, onUserInput } = props;
    const { user, content, imageSrc, options } = data;
    const containerClassName = classNames(
        styles.chatBubbleContainer,
        styles.other
    );
    const bubbleClassName = classNames(
        styles.chatBubbleInlineOptions,
        styles.other
    );

    const contentElem = textToElement(content);

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={CHAT_BUBBLE_TRANSITION_SECONDS * 1000}
            classNames={{
                appear: styles.appearStart,
                appearActive: styles.appearActive,
                appearDone: styles.appearDone,
            }}>
            <div className={containerClassName}>
                <div className={styles.chatBubbleInlineOptionsContainer}>
                    <div className={bubbleClassName}>
                        {imageSrc && (
                            <img
                                src={imageSrc}
                                className={styles.chatBubbleImage}
                            />
                        )}
                        {contentElem}
                        <ChatBubbleArrow user={user} />
                    </div>
                    <div className={styles.chatBubbleInlineOptionButtons}>
                        {options.map((optionRow, i) => (
                            <div
                                key={i}
                                className={
                                    styles.chatBubbleInlineOptionButtonRow
                                }>
                                {optionRow.map((option, j) => (
                                    <button
                                        key={j}
                                        className={
                                            styles.chatBubbleInlineOptionButton
                                        }
                                        onClick={() =>
                                            onUserInput({
                                                type: 'text',
                                                content: option,
                                            })
                                        }>
                                        {option}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

type OptionChatBubbleProps = {
    data: OptionChatBubbleData;
    onUserInput: (input: UserInput) => void;
};

const OptionChatBubble: FunctionComponent<OptionChatBubbleProps> = (props) => {
    const { data, onUserInput } = props;
    const { user, content, imageSrc, prompt, options } = data;

    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function openDialog() {
        setSelectedOptionIndex(0);
        setIsDialogOpen(true);
    }

    function handleInputOption() {
        onUserInput({
            type: 'text',
            content: options[selectedOptionIndex],
        });
        setIsDialogOpen(false);
    }

    const containerClassName = classNames(
        styles.chatBubbleContainer,
        styles.other
    );
    const bubbleClassName = classNames(styles.chatBubble, styles.other);

    const contentElem = textToElement(content);

    return (
        <Fragment>
            <CSSTransition
                in={true}
                appear={true}
                timeout={CHAT_BUBBLE_TRANSITION_SECONDS * 1000}
                classNames={{
                    appear: styles.appearStart,
                    appearActive: styles.appearActive,
                    appearDone: styles.appearDone,
                }}>
                <div className={containerClassName}>
                    <div className={styles.chatBubbleOptionsContainer}>
                        <div className={bubbleClassName}>
                            {imageSrc && (
                                <img
                                    src={imageSrc}
                                    className={styles.chatBubbleImage}
                                />
                            )}
                            {contentElem}
                            <div className={styles.chatBubbleTextSeparator} />
                            <div
                                className={styles.chatBubbleOptionPrompt}
                                onClick={openDialog}>
                                {prompt}
                            </div>
                            <ChatBubbleArrow user={user} />
                        </div>
                    </div>
                </div>
            </CSSTransition>
            <ChatDialog
                isOpen={isDialogOpen}
                onExternalClick={() => setIsDialogOpen(false)}
                onClose={() => setIsDialogOpen(false)}>
                <div className={styles.chatDialogOptionsHeader}>{prompt}</div>
                <div className={styles.chatDialogOptionItems}>
                    {options.map((option, i) => (
                        <div
                            className={styles.chatDialogOptionItem}
                            key={i}
                            onClick={() => setSelectedOptionIndex(i)}>
                            <div className={styles.chatDialogOptionItemLabel}>
                                {option}
                            </div>
                            <span
                                className={
                                    styles.chatDialogOptionItemRadioButtonContainer
                                }>
                                <span
                                    className={classNames(
                                        styles.chatDialogOptionItemRadioButton,
                                        selectedOptionIndex === i &&
                                            styles.active
                                    )}
                                />
                            </span>
                        </div>
                    ))}
                </div>
                <div className={styles.chatDialogOptionsConfirmContainer}>
                    <button
                        className={styles.chatDialogOptionsConfirmButton}
                        onClick={handleInputOption}>
                        SEND
                    </button>
                </div>
            </ChatDialog>
        </Fragment>
    );
};

type ChatBubbleArrowProps = {
    user: User;
};

const ChatBubbleArrow: FunctionComponent<ChatBubbleArrowProps> = ({ user }) => {
    const className = classNames(
        styles.chatBubbleArrow,
        user === 'self' && styles.self,
        user === 'other' && styles.other
    );
    return (
        <svg
            width="26"
            height="15"
            viewBox="0 0 26 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}>
            <path d="M1.33018 3.39956C0.09025 2.1338 0.987012 0 2.7589 0H23.1017C24.8933 0 25.7812 2.17446 24.5016 3.42843L14.1226 13.5999C13.3336 14.3731 12.0671 14.3602 11.294 13.571L1.33018 3.39956Z" />
        </svg>
    );
};

type ChatDialogProps = {
    isOpen: boolean;
    onExternalClick?: () => void;
    onClose?: () => void; // If not specified, no close
};

const ChatDialog: FunctionComponent<ChatDialogProps> = (props) => {
    const { isOpen, onExternalClick, onClose, children } = props;
    const chatDialogRoot = useChatDialogRoot();
    const [hasRendered, setHasRendered] = useState(false);

    useEffect(() => setHasRendered(true), []);

    if (!hasRendered) {
        return null;
    }

    function handleExternalClick() {
        onExternalClick && onExternalClick();
    }

    return createPortal(
        <div
            className={classNames(
                styles.chatDialogContainer,
                isOpen && styles.isOpen
            )}>
            <div
                className={classNames(
                    styles.chatDialogBackground,
                    isOpen && styles.isOpen
                )}
                onClick={handleExternalClick}
            />
            <div
                className={classNames(
                    styles.chatDialog,
                    isOpen && styles.isOpen
                )}>
                {children}
                {onClose && (
                    <button
                        className={styles.chatDialogCloseButton}
                        onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.chatDialogCloseButtonImage}
                            viewBox="0 0 333 333"
                            fillRule="evenodd"
                            shapeRendering="geometricPrecision"
                            imageRendering="optimizeQuality">
                            <path d="M319 45L196 167l123 122c19 19-11 49-30 30L167 196 45 319c-20 19-50-11-30-30l122-122L15 45C-5 25 25-5 45 15l122 122L289 15c19-20 49 10 30 30z" />
                        </svg>
                    </button>
                )}
            </div>
        </div>,
        chatDialogRoot
    );
};

function useChatDialogRoot() {
    if (typeof window === 'undefined') {
        return;
    }
    useEffect(() => {
        if (!document.getElementById('chat-dialog')) {
            const dialogElem = document.createElement('div');
            dialogElem.setAttribute('id', 'chat-dialog');
            window.document.body.appendChild(dialogElem);
        }
    }, []);
    return document.getElementById('chat-dialog');
}

function textToElement(text: string): ReactNode {
    const emojiRegex_ = emojiRegex();
    const contentElem = text.split('\n').map((line, i) => {
        const lineContent = [];
        let lastIndex = 0;
        for (const match of line.matchAll(emojiRegex_)) {
            lineContent.push(
                <Fragment key={lineContent.length}>
                    {line.substring(lastIndex, match.index)}
                </Fragment>
            );

            const emojiStr = match[0];
            const emojiCode = getEmojiCode(emojiStr);
            const emojiSrc = `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/32/emoji_u${emojiCode}.png`;
            lineContent.push(
                <img
                    key={lineContent.length}
                    className={styles.emoji}
                    src={emojiSrc}
                />
            );
            lastIndex = match.index + match[0].length;
        }
        lineContent.push(
            <Fragment key={lineContent.length}>
                {line.substring(lastIndex, line.length)}
            </Fragment>
        );

        return (
            <Fragment key={i}>
                {i > 0 && <br />}
                {lineContent}
            </Fragment>
        );
    });
    return contentElem;
}

function getEmojiCode(emojiStr: string): string {
    if (emojiStr === 'ℹ') {
        return '2139';
    } else if (emojiStr === '💼') {
        return '1f4bc';
    } else if (emojiStr === '😀') {
        return '1f600';
    } else if (emojiStr === '📍') {
        return '1f4cd';
    } else if (emojiStr === '✨') {
        return '2728';
    } else if (emojiStr === '✔️') {
        return '2714';
    } else if (emojiStr === '🗒️') {
        return '1f5d2';
    }
    return emojiStr
        .split('')
        .map((c) => c.charCodeAt(0).toString(16))
        .join('_')
        .split('_')[0];
}

export default IndexPage;
