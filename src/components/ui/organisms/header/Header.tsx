import Heading from "@/components/ui/atoms/heading/Heading";

type HeaderProps = {
    pageTitle: string;
}

const Header = ({ pageTitle }: HeaderProps) => {
    return (
        <header className="mt-6">
            <Heading level={1}>
                {pageTitle}
            </Heading>
            <hr className="my-6" />
        </header>
    )
};

export default Header;
