import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { deletePost } from "@/lib/actions/deletePost";


type DeletePostDialogProps = {
	postId: string;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function DeletePostDialog(
	{postId, isOpen, onOpenChange}: DeletePostDialogProps) {
	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
				<AlertDialogTitle>記事の削除</AlertDialogTitle>
				<AlertDialogDescription>
					記事を削除すると元に戻すことはできません。<br />
					本当に削除しますか？
				</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
				<AlertDialogCancel>キャンセル</AlertDialogCancel>
				<AlertDialogAction onClick={() => deletePost(postId)}
					className="bg-red-500 hover:bg-red-600">
						削除
				</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
